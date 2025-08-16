import { createEnemy, BaseEnemy, ENEMY_SPAWN_PATTERNS, EnemyType } from './Enemy';
import { STORY_SCRIPT } from './StoryScript';

export interface LevelConfig {
  levelNumber: number;
  title: string;
  description: string;
  objective: string;
  backgroundTheme: string;
  enemySpawns: EnemySpawn[];
  environmentHazards: EnvironmentHazard[];
  specialMechanics: SpecialMechanic[];
  timeLimit?: number; // in seconds
  requiredScore?: number;
}

export interface EnemySpawn {
  type: EnemyType;
  x: number;
  y: number;
  count: number;
  spawnDelay?: number; // delay before spawning in milliseconds
  waveNumber?: number; // which wave this enemy belongs to
}

export interface EnvironmentHazard {
  type: 'pit' | 'laser' | 'electric' | 'gas';
  x: number;
  y: number;
  width: number;
  height: number;
  damage: number;
  active: boolean;
  cycleTime?: number; // for hazards that turn on/off
}

export interface SpecialMechanic {
  type: 'hacking_terminal' | 'information_source' | 'stealth_zone' | 'cyber_node';
  x: number;
  y: number;
  width: number;
  height: number;
  characterSpecific?: string; // which character can use this
  activated: boolean;
  effect: string;
}

export class Level {
  public config: LevelConfig;
  public enemies: BaseEnemy[];
  public completedObjectives: string[];
  public isCompleted: boolean;
  public startTime: number;
  public currentWave: number;
  public totalWaves: number;

  constructor(levelNumber: number) {
    this.config = this.generateLevelConfig(levelNumber);
    this.enemies = [];
    this.completedObjectives = [];
    this.isCompleted = false;
    this.startTime = Date.now();
    this.currentWave = 1;
    this.totalWaves = this.calculateTotalWaves();
  }

  private generateLevelConfig(levelNumber: number): LevelConfig {
    const config: LevelConfig = {
      levelNumber,
      title: STORY_SCRIPT.LEVEL_NARRATIVES[`level${levelNumber}` as keyof typeof STORY_SCRIPT.LEVEL_NARRATIVES]?.title || `Level ${levelNumber}`,
      description: STORY_SCRIPT.LEVEL_NARRATIVES[`level${levelNumber}` as keyof typeof STORY_SCRIPT.LEVEL_NARRATIVES]?.description || '',
      objective: STORY_SCRIPT.LEVEL_NARRATIVES[`level${levelNumber}` as keyof typeof STORY_SCRIPT.LEVEL_NARRATIVES]?.objective || 'Defeat all enemies',
      backgroundTheme: this.getBackgroundTheme(levelNumber),
      enemySpawns: this.generateEnemySpawns(levelNumber),
      environmentHazards: this.generateEnvironmentHazards(levelNumber),
      specialMechanics: this.generateSpecialMechanics(levelNumber)
    };

    // Add time limits for higher levels
    if (levelNumber >= 4) {
      config.timeLimit = 300 - (levelNumber * 30); // Decreasing time limit
    }

    return config;
  }

  private getBackgroundTheme(levelNumber: number): string {
    const themes = [
      'moscow_streets', // Level 1
      'belarus_border', // Level 2
      'abandoned_facility', // Level 3
      'high_security_compound', // Level 4
      'shadow_lair' // Level 5
    ];
    return themes[levelNumber - 1] || 'default';
  }

  private generateEnemySpawns(levelNumber: number): EnemySpawn[] {
    const spawns: EnemySpawn[] = [];
    
    switch (levelNumber) {
      case 1:
        spawns.push(
          { type: 'grunt', x: 800, y: 450, count: 3, waveNumber: 1 },
          { type: 'grunt', x: 1000, y: 450, count: 2, spawnDelay: 5000, waveNumber: 2 }
        );
        break;
        
      case 2:
        spawns.push(
          { type: 'grunt', x: 700, y: 450, count: 2, waveNumber: 1 },
          { type: 'enforcer', x: 900, y: 450, count: 1, spawnDelay: 3000, waveNumber: 1 },
          { type: 'grunt', x: 1100, y: 450, count: 2, spawnDelay: 8000, waveNumber: 2 }
        );
        break;
        
      case 3:
        spawns.push(
          { type: 'grunt', x: 600, y: 450, count: 2, waveNumber: 1 },
          { type: 'enforcer', x: 800, y: 450, count: 1, spawnDelay: 2000, waveNumber: 1 },
          { type: 'sniper', x: 1000, y: 350, count: 1, spawnDelay: 5000, waveNumber: 2 },
          { type: 'grunt', x: 1200, y: 450, count: 2, spawnDelay: 10000, waveNumber: 3 }
        );
        break;
        
      case 4:
        spawns.push(
          { type: 'enforcer', x: 600, y: 450, count: 1, waveNumber: 1 },
          { type: 'sniper', x: 800, y: 350, count: 1, spawnDelay: 1000, waveNumber: 1 },
          { type: 'grunt', x: 1000, y: 450, count: 3, spawnDelay: 4000, waveNumber: 2 },
          { type: 'enforcer', x: 1200, y: 450, count: 2, spawnDelay: 8000, waveNumber: 3 }
        );
        break;
        
      case 5:
        spawns.push(
          { type: 'enforcer', x: 500, y: 450, count: 1, waveNumber: 1 },
          { type: 'sniper', x: 700, y: 350, count: 1, spawnDelay: 2000, waveNumber: 1 },
          { type: 'grunt', x: 900, y: 450, count: 2, spawnDelay: 5000, waveNumber: 2 },
          { type: 'shadow_boss', x: 1100, y: 350, count: 1, spawnDelay: 15000, waveNumber: 3 }
        );
        break;
    }
    
    return spawns;
  }

  private generateEnvironmentHazards(levelNumber: number): EnvironmentHazard[] {
    const hazards: EnvironmentHazard[] = [];
    
    switch (levelNumber) {
      case 2:
        hazards.push({
          type: 'pit',
          x: 400,
          y: 500,
          width: 100,
          height: 100,
          damage: 20,
          active: true
        });
        break;
        
      case 3:
        hazards.push(
          {
            type: 'laser',
            x: 500,
            y: 300,
            width: 20,
            height: 200,
            damage: 15,
            active: true,
            cycleTime: 3000
          },
          {
            type: 'electric',
            x: 800,
            y: 480,
            width: 150,
            height: 20,
            damage: 10,
            active: true,
            cycleTime: 2000
          }
        );
        break;
        
      case 4:
        hazards.push(
          {
            type: 'laser',
            x: 300,
            y: 200,
            width: 20,
            height: 300,
            damage: 20,
            active: true,
            cycleTime: 2500
          },
          {
            type: 'gas',
            x: 600,
            y: 400,
            width: 200,
            height: 100,
            damage: 5,
            active: true,
            cycleTime: 4000
          },
          {
            type: 'electric',
            x: 1000,
            y: 480,
            width: 100,
            height: 20,
            damage: 15,
            active: true,
            cycleTime: 1500
          }
        );
        break;
        
      case 5:
        hazards.push(
          {
            type: 'laser',
            x: 200,
            y: 100,
            width: 20,
            height: 400,
            damage: 25,
            active: true,
            cycleTime: 2000
          },
          {
            type: 'laser',
            x: 600,
            y: 100,
            width: 20,
            height: 400,
            damage: 25,
            active: true,
            cycleTime: 2000
          },
          {
            type: 'gas',
            x: 800,
            y: 300,
            width: 300,
            height: 200,
            damage: 8,
            active: true,
            cycleTime: 3000
          }
        );
        break;
    }
    
    return hazards;
  }

  private generateSpecialMechanics(levelNumber: number): SpecialMechanic[] {
    const mechanics: SpecialMechanic[] = [];
    
    switch (levelNumber) {
      case 1:
        mechanics.push({
          type: 'information_source',
          x: 300,
          y: 450,
          width: 40,
          height: 50,
          characterSpecific: 'journalist',
          activated: false,
          effect: 'Reveals enemy positions for 10 seconds'
        });
        break;
        
      case 2:
        mechanics.push(
          {
            type: 'hacking_terminal',
            x: 250,
            y: 400,
            width: 50,
            height: 60,
            characterSpecific: 'developer',
            activated: false,
            effect: 'Disables security cameras and alarms'
          },
          {
            type: 'stealth_zone',
            x: 500,
            y: 400,
            width: 100,
            height: 100,
            characterSpecific: 'agent',
            activated: false,
            effect: 'Provides temporary invisibility'
          }
        );
        break;
        
      case 3:
        mechanics.push(
          {
            type: 'cyber_node',
            x: 200,
            y: 350,
            width: 40,
            height: 40,
            characterSpecific: 'hacker',
            activated: false,
            effect: 'Takes control of facility security systems'
          },
          {
            type: 'information_source',
            x: 400,
            y: 400,
            width: 40,
            height: 50,
            characterSpecific: 'journalist',
            activated: false,
            effect: 'Reveals facility layout and enemy patrol routes'
          }
        );
        break;
        
      case 4:
        mechanics.push(
          {
            type: 'hacking_terminal',
            x: 150,
            y: 350,
            width: 50,
            height: 60,
            characterSpecific: 'developer',
            activated: false,
            effect: 'Overrides security protocols'
          },
          {
            type: 'stealth_zone',
            x: 700,
            y: 300,
            width: 120,
            height: 120,
            characterSpecific: 'agent',
            activated: false,
            effect: 'Allows bypassing heavily guarded areas'
          },
          {
            type: 'cyber_node',
            x: 1000,
            y: 300,
            width: 40,
            height: 40,
            characterSpecific: 'hacker',
            activated: false,
            effect: 'Disrupts enemy communications'
          }
        );
        break;
        
      case 5:
        mechanics.push(
          {
            type: 'hacking_terminal',
            x: 100,
            y: 300,
            width: 50,
            height: 60,
            characterSpecific: 'developer',
            activated: false,
            effect: 'Accesses Shadow Syndicate mainframe'
          },
          {
            type: 'information_source',
            x: 300,
            y: 350,
            width: 40,
            height: 50,
            characterSpecific: 'journalist',
            activated: false,
            effect: 'Discovers Svetlana\'s exact location'
          },
          {
            type: 'stealth_zone',
            x: 500,
            y: 250,
            width: 150,
            height: 150,
            characterSpecific: 'agent',
            activated: false,
            effect: 'Provides tactical advantage against The Shadow'
          },
          {
            type: 'cyber_node',
            x: 800,
            y: 250,
            width: 40,
            height: 40,
            characterSpecific: 'hacker',
            activated: false,
            effect: 'Weakens The Shadow\'s cybernetic enhancements'
          }
        );
        break;
    }
    
    return mechanics;
  }

  private calculateTotalWaves(): number {
    const waves = new Set(this.config.enemySpawns.map(spawn => spawn.waveNumber || 1));
    return waves.size;
  }

  public spawnEnemies(currentTime: number): BaseEnemy[] {
    const newEnemies: BaseEnemy[] = [];
    const elapsedTime = currentTime - this.startTime;
    
    this.config.enemySpawns.forEach(spawn => {
      const spawnTime = spawn.spawnDelay || 0;
      
      if (elapsedTime >= spawnTime && !spawn.count) {
        return;
      }
      
      if (elapsedTime >= spawnTime && spawn.count > 0) {
        for (let i = 0; i < spawn.count; i++) {
          const enemy = createEnemy(
            spawn.type, 
            spawn.x + (i * 50), 
            spawn.y, 
            this.config.levelNumber
          );
          newEnemies.push(enemy);
        }
        spawn.count = 0;
      }
    });
    
    return newEnemies;
  }

  public updateHazards(currentTime: number): void {
    this.config.environmentHazards.forEach(hazard => {
      if (hazard.cycleTime) {
        const cyclePosition = (currentTime - this.startTime) % hazard.cycleTime;
        hazard.active = cyclePosition < (hazard.cycleTime / 2);
      }
    });
  }

  public checkHazardCollision(playerX: number, playerY: number, playerWidth: number, playerHeight: number): number {
    let totalDamage = 0;
    
    this.config.environmentHazards.forEach(hazard => {
      if (!hazard.active) return;
      
      const collision = playerX < hazard.x + hazard.width &&
                       playerX + playerWidth > hazard.x &&
                       playerY < hazard.y + hazard.height &&
                       playerY + playerHeight > hazard.y;
      
      if (collision) {
        totalDamage += hazard.damage;
      }
    });
    
    return totalDamage;
  }

  public activateSpecialMechanic(mechanicIndex: number, characterType: string): boolean {
    if (mechanicIndex >= 0 && mechanicIndex < this.config.specialMechanics.length) {
      const mechanic = this.config.specialMechanics[mechanicIndex];
      
      if (mechanic.characterSpecific && mechanic.characterSpecific !== characterType) {
        return false;
      }
      
      if (!mechanic.activated) {
        mechanic.activated = true;
        return true;
      }
    }
    
    return false;
  }

  public checkMechanicCollision(playerX: number, playerY: number, playerWidth: number, playerHeight: number): number[] {
    const collisions: number[] = [];
    
    this.config.specialMechanics.forEach((mechanic, index) => {
      if (mechanic.activated) return;
      
      const collision = playerX < mechanic.x + mechanic.width &&
                       playerX + playerWidth > mechanic.x &&
                       playerY < mechanic.y + mechanic.height &&
                       playerY + playerHeight > mechanic.y;
      
      if (collision) {
        collisions.push(index);
      }
    });
    
    return collisions;
  }

  public isLevelComplete(): boolean {
    return this.enemies.length === 0 && this.currentWave >= this.totalWaves;
  }

  public getTimeRemaining(): number {
    if (!this.config.timeLimit) return -1;
    
    const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    return Math.max(0, this.config.timeLimit - elapsedSeconds);
  }

  public addObjective(objective: string): void {
    if (!this.completedObjectives.includes(objective)) {
      this.completedObjectives.push(objective);
    }
  }

  public getProgress(): { completed: number; total: number; percentage: number } {
    const totalObjectives = this.totalWaves + this.config.specialMechanics.length;
    const completedObjectives = this.completedObjectives.length;
    
    return {
      completed: completedObjectives,
      total: totalObjectives,
      percentage: Math.floor((completedObjectives / totalObjectives) * 100)
    };
  }
}

export function createLevel(levelNumber: number): Level {
  return new Level(levelNumber);
}

export class LevelManager {
  private currentLevel: Level | null = null;
  private levelNumber: number = 1;
  
  public startLevel(levelNumber: number): Level {
    this.levelNumber = levelNumber;
    this.currentLevel = createLevel(levelNumber);
    return this.currentLevel;
  }
  
  public getCurrentLevel(): Level | null {
    return this.currentLevel;
  }
  
  public nextLevel(): Level | null {
    if (this.levelNumber < 5) {
      return this.startLevel(this.levelNumber + 1);
    }
    return null;
  }
  
  public restartLevel(): Level {
    return this.startLevel(this.levelNumber);
  }
}
