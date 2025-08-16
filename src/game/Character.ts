export interface CharacterAbility {
  name: string;
  description: string;
  cooldown: number;
  lastUsed: number;
}

export abstract class BaseCharacter {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public health: number;
  public maxHealth: number;
  public velocityX: number;
  public velocityY: number;
  public isJumping: boolean;
  public characterType: string;
  public abilities: CharacterAbility[];
  public isAttacking: boolean;
  public attackCooldown: number;
  public lastAttackTime: number;

  constructor(
    x: number, 
    y: number, 
    characterType: string,
    width: number = 40,
    height: number = 60
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = 100;
    this.maxHealth = 100;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.characterType = characterType;
    this.abilities = [];
    this.isAttacking = false;
    this.attackCooldown = 500; // milliseconds
    this.lastAttackTime = 0;
  }

  public update(deltaTime: number): void {
    // Apply physics
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Apply gravity
    if (this.isJumping) {
      this.velocityY += 0.8;
    }

    // Ground collision
    if (this.y >= 400) {
      this.y = 400;
      this.velocityY = 0;
      this.isJumping = false;
    }

    // Apply friction
    this.velocityX *= 0.8;

    // Update attack state
    if (this.isAttacking && Date.now() - this.lastAttackTime > 200) {
      this.isAttacking = false;
    }
  }

  public jump(): void {
    if (!this.isJumping) {
      this.velocityY = -15;
      this.isJumping = true;
    }
  }

  public moveLeft(): void {
    this.velocityX = -5;
  }

  public moveRight(): void {
    this.velocityX = 5;
  }

  public attack(): boolean {
    const currentTime = Date.now();
    if (currentTime - this.lastAttackTime >= this.attackCooldown) {
      this.isAttacking = true;
      this.lastAttackTime = currentTime;
      return true;
    }
    return false;
  }

  public useAbility(abilityIndex: number): boolean {
    if (abilityIndex >= 0 && abilityIndex < this.abilities.length) {
      const ability = this.abilities[abilityIndex];
      const currentTime = Date.now();
      
      if (currentTime - ability.lastUsed >= ability.cooldown) {
        ability.lastUsed = currentTime;
        this.executeAbility(ability);
        return true;
      }
    }
    return false;
  }

  protected abstract executeAbility(ability: CharacterAbility): void;

  public takeDamage(damage: number): void {
    this.health = Math.max(0, this.health - damage);
  }

  public heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  public isAlive(): boolean {
    return this.health > 0;
  }

  public getAttackRange(): number {
    return 60; // Base attack range
  }

  public getAttackDamage(): number {
    return 20; // Base attack damage
  }
}

export class DeveloperCharacter extends BaseCharacter {
  private hackingActive: boolean = false;
  private trackingData: any[] = [];

  constructor(x: number, y: number) {
    super(x, y, 'developer');
    this.abilities = [
      {
        name: 'Digital Infiltration',
        description: 'Hack nearby electronic systems to disable enemy defenses',
        cooldown: 8000,
        lastUsed: 0
      },
      {
        name: 'Satellite Tracking',
        description: 'Reveal all enemy positions on the map',
        cooldown: 15000,
        lastUsed: 0
      },
      {
        name: 'System Override',
        description: 'Temporarily disable all enemy attacks',
        cooldown: 20000,
        lastUsed: 0
      }
    ];
  }

  protected executeAbility(ability: CharacterAbility): void {
    switch (ability.name) {
      case 'Digital Infiltration':
        this.hackingActive = true;
        setTimeout(() => this.hackingActive = false, 3000);
        break;
      case 'Satellite Tracking':
        // This would be handled by the game engine to reveal enemies
        break;
      case 'System Override':
        // This would be handled by the game engine to disable enemy attacks
        break;
    }
  }

  public isHackingActive(): boolean {
    return this.hackingActive;
  }

  public getAttackRange(): number {
    return this.hackingActive ? 120 : 60; // Extended range when hacking
  }
}

export class JournalistCharacter extends BaseCharacter {
  private sourceNetwork: string[] = [];
  private informationGathered: number = 0;

  constructor(x: number, y: number) {
    super(x, y, 'journalist');
    this.abilities = [
      {
        name: 'Source Network',
        description: 'Gather intelligence from contacts to reveal enemy weaknesses',
        cooldown: 10000,
        lastUsed: 0
      },
      {
        name: 'Public Access',
        description: 'Use journalist credentials to bypass certain enemy defenses',
        cooldown: 12000,
        lastUsed: 0
      },
      {
        name: 'Information Analysis',
        description: 'Analyze gathered data to predict enemy movements',
        cooldown: 18000,
        lastUsed: 0
      }
    ];
  }

  protected executeAbility(ability: CharacterAbility): void {
    switch (ability.name) {
      case 'Source Network':
        this.informationGathered += 1;
        break;
      case 'Public Access':
        // Handled by game engine - allows bypassing certain obstacles
        break;
      case 'Information Analysis':
        // Handled by game engine - reveals enemy attack patterns
        break;
    }
  }

  public getInformationLevel(): number {
    return this.informationGathered;
  }

  public getAttackDamage(): number {
    // Damage increases with information gathered
    return 20 + (this.informationGathered * 5);
  }
}

export class AgentCharacter extends BaseCharacter {
  private stealthMode: boolean = false;
  private combatTraining: number = 100;

  constructor(x: number, y: number) {
    super(x, y, 'agent');
    this.maxHealth = 120; // Agents have more health
    this.health = 120;
    this.abilities = [
      {
        name: 'Stealth Mode',
        description: 'Become temporarily invisible to enemies',
        cooldown: 15000,
        lastUsed: 0
      },
      {
        name: 'Combat Training',
        description: 'Increase attack damage and speed for a short time',
        cooldown: 12000,
        lastUsed: 0
      },
      {
        name: 'Tactical Strike',
        description: 'Perform a devastating area attack',
        cooldown: 20000,
        lastUsed: 0
      }
    ];
  }

  protected executeAbility(ability: CharacterAbility): void {
    switch (ability.name) {
      case 'Stealth Mode':
        this.stealthMode = true;
        setTimeout(() => this.stealthMode = false, 5000);
        break;
      case 'Combat Training':
        this.combatTraining = 150;
        setTimeout(() => this.combatTraining = 100, 8000);
        break;
      case 'Tactical Strike':
        // Handled by game engine - area of effect attack
        break;
    }
  }

  public isInStealth(): boolean {
    return this.stealthMode;
  }

  public getAttackDamage(): number {
    return Math.floor(30 * (this.combatTraining / 100));
  }

  public getAttackRange(): number {
    return this.combatTraining > 100 ? 80 : 60;
  }
}

export class HackerCharacter extends BaseCharacter {
  private systemsControlled: number = 0;
  private digitalInvisibility: boolean = false;

  constructor(x: number, y: number) {
    super(x, y, 'hacker');
    this.abilities = [
      {
        name: 'System Control',
        description: 'Take control of enemy electronic systems',
        cooldown: 8000,
        lastUsed: 0
      },
      {
        name: 'Digital Invisibility',
        description: 'Become undetectable by electronic surveillance',
        cooldown: 18000,
        lastUsed: 0
      },
      {
        name: 'Cyber Warfare',
        description: 'Launch a devastating cyber attack on all enemies',
        cooldown: 25000,
        lastUsed: 0
      }
    ];
  }

  protected executeAbility(ability: CharacterAbility): void {
    switch (ability.name) {
      case 'System Control':
        this.systemsControlled += 1;
        break;
      case 'Digital Invisibility':
        this.digitalInvisibility = true;
        setTimeout(() => this.digitalInvisibility = false, 6000);
        break;
      case 'Cyber Warfare':
        // Handled by game engine - damages all enemies
        break;
    }
  }

  public getSystemsControlled(): number {
    return this.systemsControlled;
  }

  public isDigitallyInvisible(): boolean {
    return this.digitalInvisibility;
  }

  public getAttackDamage(): number {
    // Damage increases with systems controlled
    return 25 + (this.systemsControlled * 3);
  }
}

// Factory function to create characters
export function createCharacter(type: string, x: number, y: number): BaseCharacter {
  switch (type) {
    case 'developer':
      return new DeveloperCharacter(x, y);
    case 'journalist':
      return new JournalistCharacter(x, y);
    case 'agent':
      return new AgentCharacter(x, y);
    case 'hacker':
      return new HackerCharacter(x, y);
    default:
      throw new Error(`Unknown character type: ${type}`);
  }
}

// Character type definitions for TypeScript
export type CharacterType = 'developer' | 'journalist' | 'agent' | 'hacker';

export const CHARACTER_INFO = {
  developer: {
    name: 'Ammar Hassan',
    title: 'Elite Software Engineer',
    description: 'Master of digital infiltration and cyber tracking',
    strengths: ['Hacking', 'Digital Forensics', 'System Analysis'],
    baseStats: { health: 100, attack: 20, speed: 5, range: 60 }
  },
  journalist: {
    name: 'Nadia Volkov',
    title: 'Investigative Journalist',
    description: 'Expert in information gathering and source networks',
    strengths: ['Intelligence', 'Social Networks', 'Information Analysis'],
    baseStats: { health: 100, attack: 20, speed: 5, range: 60 }
  },
  agent: {
    name: 'Marcus Steel',
    title: 'Former Special Forces',
    description: 'Combat specialist with tactical expertise',
    strengths: ['Combat', 'Stealth', 'Tactical Operations'],
    baseStats: { health: 120, attack: 30, speed: 5, range: 60 }
  },
  hacker: {
    name: 'Zero',
    title: 'Cyber Warfare Specialist',
    description: 'Anonymous digital warrior with system control abilities',
    strengths: ['Cyber Warfare', 'System Control', 'Digital Invisibility'],
    baseStats: { health: 100, attack: 25, speed: 5, range: 60 }
  }
};
