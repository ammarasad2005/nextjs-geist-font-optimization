export interface GameState {
  screen: 'intro' | 'characterSelect' | 'playing' | 'victory' | 'gameOver';
  currentLevel: number;
  selectedCharacter: string | null;
  playerHealth: number;
  playerLives: number;
  score: number;
  enemies: Enemy[];
  player: Player | null;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  velocityX: number;
  velocityY: number;
  isJumping: boolean;
  characterType: string;
  abilities: string[];
}

export interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  type: 'minion' | 'boss';
  velocityX: number;
  velocityY: number;
  attackPower: number;
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private gameState: GameState;
  private keys: { [key: string]: boolean } = {};
  private animationId: number | null = null;
  private lastTime: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;
    
    this.gameState = {
      screen: 'intro',
      currentLevel: 1,
      selectedCharacter: null,
      playerHealth: 100,
      playerLives: 4,
      score: 0,
      enemies: [],
      player: null
    };

    this.setupCanvas();
    this.setupEventListeners();
  }

  private setupCanvas(): void {
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.canvas.style.border = '2px solid #333';
    this.canvas.style.backgroundColor = '#000';
  }

  private setupEventListeners(): void {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      this.handleKeyPress(e.code);
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    });
  }

  private handleKeyPress(keyCode: string): void {
    try {
      switch (this.gameState.screen) {
        case 'intro':
          if (keyCode === 'Space' || keyCode === 'Enter') {
            this.gameState.screen = 'characterSelect';
          }
          break;
        case 'characterSelect':
          if (keyCode === 'Digit1') this.selectCharacter('developer');
          if (keyCode === 'Digit2') this.selectCharacter('journalist');
          if (keyCode === 'Digit3') this.selectCharacter('agent');
          if (keyCode === 'Digit4') this.selectCharacter('hacker');
          break;
        case 'playing':
          this.handleGameplayKeys(keyCode);
          break;
        case 'gameOver':
        case 'victory':
          if (keyCode === 'Space' || keyCode === 'Enter') {
            this.restartGame();
          }
          break;
      }
    } catch (error) {
      console.error('Error handling key press:', error);
    }
  }

  private handleGameplayKeys(keyCode: string): void {
    if (!this.gameState.player) return;

    const player = this.gameState.player;
    
    switch (keyCode) {
      case 'ArrowLeft':
        player.velocityX = -5;
        break;
      case 'ArrowRight':
        player.velocityX = 5;
        break;
      case 'ArrowUp':
      case 'Space':
        if (!player.isJumping) {
          player.velocityY = -15;
          player.isJumping = true;
        }
        break;
      case 'KeyX':
        this.playerAttack();
        break;
    }
  }

  public selectCharacter(characterType: string): void {
    this.gameState.selectedCharacter = characterType;
    this.initializePlayer(characterType);
    this.gameState.screen = 'playing';
    this.startLevel(1);
  }

  private initializePlayer(characterType: string): void {
    const abilities = this.getCharacterAbilities(characterType);
    
    this.gameState.player = {
      x: 100,
      y: 400,
      width: 40,
      height: 60,
      health: 100,
      maxHealth: 100,
      velocityX: 0,
      velocityY: 0,
      isJumping: false,
      characterType,
      abilities
    };
  }

  private getCharacterAbilities(characterType: string): string[] {
    const abilityMap: { [key: string]: string[] } = {
      developer: ['hacking', 'digital_tracking', 'system_infiltration'],
      journalist: ['information_gathering', 'source_networking', 'public_access'],
      agent: ['combat_training', 'stealth', 'weapon_proficiency'],
      hacker: ['cyber_warfare', 'encryption_breaking', 'anonymous_operations']
    };
    return abilityMap[characterType] || [];
  }

  private startLevel(levelNumber: number): void {
    this.gameState.currentLevel = levelNumber;
    this.gameState.enemies = this.generateEnemiesForLevel(levelNumber);
    
    if (this.gameState.player) {
      this.gameState.player.x = 100;
      this.gameState.player.y = 400;
    }
  }

  private generateEnemiesForLevel(level: number): Enemy[] {
    const enemies: Enemy[] = [];
    const enemyCount = Math.min(3 + level, 8);
    
    for (let i = 0; i < enemyCount; i++) {
      enemies.push({
        x: 800 + (i * 150),
        y: 450,
        width: 35,
        height: 50,
        health: 50 + (level * 10),
        maxHealth: 50 + (level * 10),
        type: 'minion',
        velocityX: -1 - (level * 0.2),
        velocityY: 0,
        attackPower: 10 + (level * 2)
      });
    }

    if (level === 5) {
      enemies.push({
        x: 1000,
        y: 350,
        width: 60,
        height: 80,
        health: 200,
        maxHealth: 200,
        type: 'boss',
        velocityX: -0.5,
        velocityY: 0,
        attackPower: 25
      });
    }

    return enemies;
  }

  private playerAttack(): void {
    if (!this.gameState.player) return;

    const player = this.gameState.player;
    const attackRange = 60;

    this.gameState.enemies.forEach(enemy => {
      const distance = Math.abs(player.x - enemy.x);
      if (distance < attackRange) {
        enemy.health -= 20;
        if (enemy.health <= 0) {
          this.gameState.score += enemy.type === 'boss' ? 100 : 25;
        }
      }
    });

    this.gameState.enemies = this.gameState.enemies.filter(enemy => enemy.health > 0);

    if (this.gameState.enemies.length === 0) {
      if (this.gameState.currentLevel < 5) {
        this.startLevel(this.gameState.currentLevel + 1);
      } else {
        this.gameState.screen = 'victory';
      }
    }
  }

  public start(): void {
    try {
      this.gameLoop(0);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  }

  private gameLoop = (currentTime: number): void => {
    try {
      const deltaTime = currentTime - this.lastTime;
      this.lastTime = currentTime;

      this.update(deltaTime);
      this.render();

      this.animationId = requestAnimationFrame(this.gameLoop);
    } catch (error) {
      console.error('Error in game loop:', error);
      this.stop();
    }
  };

  private update(deltaTime: number): void {
    if (this.gameState.screen !== 'playing' || !this.gameState.player) return;

    const player = this.gameState.player;

    player.x += player.velocityX;
    player.y += player.velocityY;

    if (player.isJumping) {
      player.velocityY += 0.8;
    }

    if (player.y >= 400) {
      player.y = 400;
      player.velocityY = 0;
      player.isJumping = false;
    }

    player.x = Math.max(0, Math.min(this.canvas.width - player.width, player.x));
    player.velocityX *= 0.8;

    this.gameState.enemies.forEach(enemy => {
      enemy.x += enemy.velocityX;
      
      if (player.x > enemy.x) {
        enemy.velocityX = Math.abs(enemy.velocityX);
      } else {
        enemy.velocityX = -Math.abs(enemy.velocityX);
      }

      if (this.checkCollision(player, enemy)) {
        player.health -= enemy.attackPower;
        if (player.health <= 0) {
          this.gameState.playerLives--;
          if (this.gameState.playerLives <= 0) {
            this.gameState.screen = 'gameOver';
          } else {
            player.health = player.maxHealth;
            player.x = 100;
            player.y = 400;
          }
        }
      }
    });
  }

  private checkCollision(rect1: any, rect2: any): boolean {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  private render(): void {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    switch (this.gameState.screen) {
      case 'intro':
        this.renderIntroScreen();
        break;
      case 'characterSelect':
        this.renderCharacterSelect();
        break;
      case 'playing':
        this.renderGameplay();
        break;
      case 'victory':
        this.renderVictoryScreen();
        break;
      case 'gameOver':
        this.renderGameOverScreen();
        break;
    }
  }

  private renderIntroScreen(): void {
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('WORLD CRISIS', this.canvas.width / 2, 150);
    
    this.ctx.font = '24px Arial';
    this.ctx.fillText('The fate of humanity rests in your hands', this.canvas.width / 2, 200);
    
    this.ctx.font = '18px Arial';
    this.ctx.fillText('Press SPACE to continue', this.canvas.width / 2, 400);
  }

  private renderCharacterSelect(): void {
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '36px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('SELECT YOUR CHARACTER', this.canvas.width / 2, 100);
    
    this.ctx.font = '20px Arial';
    this.ctx.fillText('1. Developer (Ammar) - Hacking & Digital Tracking', this.canvas.width / 2, 200);
    this.ctx.fillText('2. Journalist (Nadia) - Information & Sources', this.canvas.width / 2, 250);
    this.ctx.fillText('3. Agent - Combat & Stealth', this.canvas.width / 2, 300);
    this.ctx.fillText('4. Hacker - Cyber Warfare', this.canvas.width / 2, 350);
  }

  private renderGameplay(): void {
    if (!this.gameState.player) return;

    this.ctx.fillStyle = '#0f0';
    this.ctx.fillRect(this.gameState.player.x, this.gameState.player.y, 
                     this.gameState.player.width, this.gameState.player.height);

    this.gameState.enemies.forEach(enemy => {
      this.ctx.fillStyle = enemy.type === 'boss' ? '#f00' : '#f80';
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '12px Arial';
      this.ctx.fillText(`${enemy.health}`, enemy.x, enemy.y - 5);
    });

    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Level: ${this.gameState.currentLevel}`, 20, 30);
    this.ctx.fillText(`Lives: ${this.gameState.playerLives}`, 20, 60);
    this.ctx.fillText(`Health: ${this.gameState.player.health}`, 20, 90);
    this.ctx.fillText(`Score: ${this.gameState.score}`, 20, 120);
  }

  private renderVictoryScreen(): void {
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = '48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('MISSION ACCOMPLISHED!', this.canvas.width / 2, 200);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '24px Arial';
    this.ctx.fillText('The world is saved!', this.canvas.width / 2, 300);
    this.ctx.fillText('Press SPACE to restart', this.canvas.width / 2, 400);
  }

  private renderGameOverScreen(): void {
    this.ctx.fillStyle = '#f00';
    this.ctx.font = '48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, 200);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '24px Arial';
    this.ctx.fillText('The world has fallen...', this.canvas.width / 2, 300);
    this.ctx.fillText('Press SPACE to try again', this.canvas.width / 2, 400);
  }

  private restartGame(): void {
    this.gameState = {
      screen: 'intro',
      currentLevel: 1,
      selectedCharacter: null,
      playerHealth: 100,
      playerLives: 4,
      score: 0,
      enemies: [],
      player: null
    };
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public getGameState(): GameState {
    return { ...this.gameState };
  }
}
