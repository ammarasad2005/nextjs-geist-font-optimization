export interface EnemyAI {
  type: 'aggressive' | 'defensive' | 'patrol' | 'boss';
  detectionRange: number;
  attackRange: number;
  movementSpeed: number;
}

export abstract class BaseEnemy {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public health: number;
  public maxHealth: number;
  public velocityX: number;
  public velocityY: number;
  public attackPower: number;
  public enemyType: string;
  public ai: EnemyAI;
  public isAttacking: boolean;
  public lastAttackTime: number;
  public attackCooldown: number;
  public isAlive: boolean;
  public patrolStartX: number;
  public patrolEndX: number;
  public patrolDirection: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    health: number,
    attackPower: number,
    enemyType: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;
    this.maxHealth = health;
    this.velocityX = 0;
    this.velocityY = 0;
    this.attackPower = attackPower;
    this.enemyType = enemyType;
    this.isAttacking = false;
    this.lastAttackTime = 0;
    this.attackCooldown = 1000;
    this.isAlive = true;
    this.patrolStartX = x - 100;
    this.patrolEndX = x + 100;
    this.patrolDirection = 1;

    // Default AI settings
    this.ai = {
      type: 'aggressive',
      detectionRange: 150,
      attackRange: 50,
      movementSpeed: 1
    };
  }

  public update(deltaTime: number, playerX: number, playerY: number): void {
    if (!this.isAlive) return;

    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Apply gravity
    this.velocityY += 0.5;
    if (this.y >= 450) {
      this.y = 450;
      this.velocityY = 0;
    }

    // Update AI behavior
    this.updateAI(playerX, playerY);

    // Update attack state
    if (this.isAttacking && Date.now() - this.lastAttackTime > 300) {
      this.isAttacking = false;
    }
  }

  protected updateAI(playerX: number, playerY: number): void {
    const distanceToPlayer = Math.abs(this.x - playerX);
    const currentTime = Date.now();

    switch (this.ai.type) {
      case 'aggressive':
        if (distanceToPlayer <= this.ai.detectionRange) {
          // Move towards player
          if (playerX > this.x) {
            this.velocityX = this.ai.movementSpeed;
          } else {
            this.velocityX = -this.ai.movementSpeed;
          }

          // Attack if in range
          if (distanceToPlayer <= this.ai.attackRange && 
              currentTime - this.lastAttackTime >= this.attackCooldown) {
            this.attack();
          }
        } else {
          this.velocityX *= 0.8; // Slow down when player not detected
        }
        break;

      case 'patrol':
        // Patrol between two points
        if (this.x <= this.patrolStartX) {
          this.patrolDirection = 1;
        } else if (this.x >= this.patrolEndX) {
          this.patrolDirection = -1;
        }
        this.velocityX = this.ai.movementSpeed * this.patrolDirection;

        // Attack if player comes close
        if (distanceToPlayer <= this.ai.attackRange && 
            currentTime - this.lastAttackTime >= this.attackCooldown) {
          this.attack();
        }
        break;

      case 'defensive':
        // Only move if player is very close
        if (distanceToPlayer <= this.ai.attackRange) {
          if (currentTime - this.lastAttackTime >= this.attackCooldown) {
            this.attack();
          }
        }
        break;

      case 'boss':
        this.updateBossAI(playerX, playerY);
        break;
    }
  }

  protected abstract updateBossAI(playerX: number, playerY: number): void;

  public attack(): void {
    this.isAttacking = true;
    this.lastAttackTime = Date.now();
  }

  public takeDamage(damage: number): void {
    this.health = Math.max(0, this.health - damage);
    if (this.health <= 0) {
      this.isAlive = false;
    }
  }

  public getCollisionBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  public getAttackBox() {
    return {
      x: this.x - 20,
      y: this.y,
      width: this.width + 40,
      height: this.height
    };
  }
}

export class SyndicateGrunt extends BaseEnemy {
  constructor(x: number, y: number, level: number = 1) {
    super(x, y, 35, 50, 50 + (level * 10), 10 + (level * 2), 'grunt');
    
    this.ai = {
      type: 'aggressive',
      detectionRange: 120,
      attackRange: 45,
      movementSpeed: 1 + (level * 0.2)
    };
    
    this.attackCooldown = Math.max(800, 1200 - (level * 100));
  }

  protected updateBossAI(playerX: number, playerY: number): void {
    // Grunts don't have boss AI
  }
}

export class SyndicateEnforcer extends BaseEnemy {
  private chargeAttackReady: boolean = false;
  private chargeAttackCooldown: number = 3000;
  private lastChargeAttack: number = 0;

  constructor(x: number, y: number, level: number = 1) {
    super(x, y, 45, 60, 80 + (level * 15), 15 + (level * 3), 'enforcer');
    
    this.ai = {
      type: 'aggressive',
      detectionRange: 150,
      attackRange: 60,
      movementSpeed: 0.8 + (level * 0.15)
    };
    
    this.attackCooldown = Math.max(600, 1000 - (level * 80));
  }

  protected updateBossAI(playerX: number, playerY: number): void {
    // Enforcers don't have boss AI
  }

  public update(deltaTime: number, playerX: number, playerY: number): void {
    super.update(deltaTime, playerX, playerY);

    // Check for charge attack
    const currentTime = Date.now();
    const distanceToPlayer = Math.abs(this.x - playerX);
    
    if (distanceToPlayer <= 200 && 
        currentTime - this.lastChargeAttack >= this.chargeAttackCooldown) {
      this.chargeAttackReady = true;
    }

    if (this.chargeAttackReady && distanceToPlayer <= 150) {
      this.performChargeAttack(playerX);
    }
  }

  private performChargeAttack(playerX: number): void {
    this.chargeAttackReady = false;
    this.lastChargeAttack = Date.now();
    
    // Fast movement towards player
    const direction = playerX > this.x ? 1 : -1;
    this.velocityX = direction * 8;
    
    // Reset velocity after charge
    setTimeout(() => {
      this.velocityX *= 0.3;
    }, 500);
  }
}

export class SyndicateSniper extends BaseEnemy {
  private sniperPosition: { x: number, y: number };
  private aimingTime: number = 0;
  private isAiming: boolean = false;

  constructor(x: number, y: number, level: number = 1) {
    super(x, y, 30, 45, 40 + (level * 8), 25 + (level * 5), 'sniper');
    
    this.sniperPosition = { x, y };
    this.ai = {
      type: 'defensive',
      detectionRange: 300,
      attackRange: 250,
      movementSpeed: 0.5
    };
    
    this.attackCooldown = Math.max(1500, 2500 - (level * 200));
  }

  protected updateBossAI(playerX: number, playerY: number): void {
    // Snipers don't have boss AI
  }

  public update(deltaTime: number, playerX: number, playerY: number): void {
    super.update(deltaTime, playerX, playerY);

    const distanceToPlayer = Math.abs(this.x - playerX);
    
    if (distanceToPlayer <= this.ai.detectionRange) {
      if (!this.isAiming) {
        this.isAiming = true;
        this.aimingTime = Date.now();
      }
      
      // Sniper takes time to aim before shooting
      if (this.isAiming && Date.now() - this.aimingTime >= 1000) {
        if (Date.now() - this.lastAttackTime >= this.attackCooldown) {
          this.attack();
          this.isAiming = false;
        }
      }
    } else {
      this.isAiming = false;
    }
  }
}

export class TheShadowBoss extends BaseEnemy {
  private phase: number = 1;
  private specialAttackCooldown: number = 5000;
  private lastSpecialAttack: number = 0;
  private shadowClones: Array<{ x: number, y: number, active: boolean }> = [];
  private teleportCooldown: number = 3000;
  private lastTeleport: number = 0;

  constructor(x: number, y: number) {
    super(x, y, 60, 80, 300, 30, 'shadow_boss');
    
    this.ai = {
      type: 'boss',
      detectionRange: 400,
      attackRange: 80,
      movementSpeed: 1.5
    };
    
    this.attackCooldown = 800;
  }

  protected updateBossAI(playerX: number, playerY: number): void {
    const currentTime = Date.now();
    const distanceToPlayer = Math.abs(this.x - playerX);
    
    // Phase transitions based on health
    if (this.health <= this.maxHealth * 0.66 && this.phase === 1) {
      this.phase = 2;
      this.createShadowClones();
    } else if (this.health <= this.maxHealth * 0.33 && this.phase === 2) {
      this.phase = 3;
      this.ai.movementSpeed = 2.5;
      this.attackCooldown = 500;
    }

    // Teleport ability
    if (currentTime - this.lastTeleport >= this.teleportCooldown && 
        distanceToPlayer > 100) {
      this.teleportToPlayer(playerX, playerY);
    }

    // Special attacks based on phase
    if (currentTime - this.lastSpecialAttack >= this.specialAttackCooldown) {
      switch (this.phase) {
        case 1:
          this.shadowStrike(playerX, playerY);
          break;
        case 2:
          this.shadowWave();
          break;
        case 3:
          this.shadowStorm(playerX, playerY);
          break;
      }
    }

    // Normal movement and attack
    if (distanceToPlayer <= this.ai.detectionRange) {
      if (playerX > this.x) {
        this.velocityX = this.ai.movementSpeed;
      } else {
        this.velocityX = -this.ai.movementSpeed;
      }

      if (distanceToPlayer <= this.ai.attackRange && 
          currentTime - this.lastAttackTime >= this.attackCooldown) {
        this.attack();
      }
    }
  }

  private teleportToPlayer(playerX: number, playerY: number): void {
    this.lastTeleport = Date.now();
    
    // Teleport to a position near the player
    const offset = Math.random() > 0.5 ? 100 : -100;
    this.x = playerX + offset;
    this.y = playerY;
    
    // Ensure boss stays on screen
    this.x = Math.max(50, Math.min(1150, this.x));
  }

  private createShadowClones(): void {
    this.shadowClones = [
      { x: this.x - 100, y: this.y, active: true },
      { x: this.x + 100, y: this.y, active: true }
    ];
  }

  private shadowStrike(playerX: number, playerY: number): void {
    this.lastSpecialAttack = Date.now();
    // Creates a powerful directed attack towards player
    // This would be handled by the game engine for visual effects
  }

  private shadowWave(): void {
    this.lastSpecialAttack = Date.now();
    // Creates a wave attack that covers a wide area
    // This would be handled by the game engine for visual effects
  }

  private shadowStorm(playerX: number, playerY: number): void {
    this.lastSpecialAttack = Date.now();
    // Creates multiple shadow projectiles
    // This would be handled by the game engine for visual effects
  }

  public getShadowClones(): Array<{ x: number, y: number, active: boolean }> {
    return this.shadowClones;
  }

  public getPhase(): number {
    return this.phase;
  }

  public takeDamage(damage: number): void {
    // Boss takes reduced damage in later phases
    const damageReduction = this.phase === 3 ? 0.7 : this.phase === 2 ? 0.85 : 1;
    const actualDamage = Math.floor(damage * damageReduction);
    
    super.takeDamage(actualDamage);
  }
}

// Factory function to create enemies based on level and type
export function createEnemy(type: string, x: number, y: number, level: number = 1): BaseEnemy {
  switch (type) {
    case 'grunt':
      return new SyndicateGrunt(x, y, level);
    case 'enforcer':
      return new SyndicateEnforcer(x, y, level);
    case 'sniper':
      return new SyndicateSniper(x, y, level);
    case 'shadow_boss':
      return new TheShadowBoss(x, y);
    default:
      return new SyndicateGrunt(x, y, level);
  }
}

// Enemy spawn patterns for different levels
export const ENEMY_SPAWN_PATTERNS = {
  level1: [
    { type: 'grunt', x: 800, y: 450, count: 3 },
    { type: 'grunt', x: 1000, y: 450, count: 2 }
  ],
  level2: [
    { type: 'grunt', x: 700, y: 450, count: 2 },
    { type: 'enforcer', x: 900, y: 450, count: 1 },
    { type: 'grunt', x: 1100, y: 450, count: 2 }
  ],
  level3: [
    { type: 'grunt', x: 600, y: 450, count: 2 },
    { type: 'enforcer', x: 800, y: 450, count: 1 },
    { type: 'sniper', x: 1000, y: 350, count: 1 },
    { type: 'grunt', x: 1200, y: 450, count: 1 }
  ],
  level4: [
    { type: 'enforcer', x: 600, y: 450, count: 2 },
    { type: 'sniper', x: 800, y: 350, count: 1 },
    { type: 'grunt', x: 1000, y: 450, count: 3 },
    { type: 'enforcer', x: 1200, y: 450, count: 1 }
  ],
  level5: [
    { type: 'enforcer', x: 500, y: 450, count: 1 },
    { type: 'sniper', x: 700, y: 350, count: 1 },
    { type: 'grunt', x: 900, y: 450, count: 2 },
    { type: 'shadow_boss', x: 1100, y: 350, count: 1 }
  ]
};

export type EnemyType = 'grunt' | 'enforcer' | 'sniper' | 'shadow_boss';
