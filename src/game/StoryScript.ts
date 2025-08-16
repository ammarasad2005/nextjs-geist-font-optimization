export const STORY_SCRIPT = {
  INTRO: {
    title: "WORLD CRISIS: THE FINAL COUNTDOWN",
    subtitle: "A Race Against Nuclear Annihilation",
    
    narrative: `
      MOSCOW, RUSSIA - PRESENT DAY
      
      The unthinkable has happened. President Vladimir Putin has died suddenly, 
      leaving Russia in unprecedented chaos. According to the constitution, 
      his daughter Svetlana Putin should assume emergency powers to prevent 
      the activation of Russia's "Dead Hand" nuclear system.
      
      But she's gone. Vanished without a trace.
      
      Intelligence reports confirm she was kidnapped by the Shadow Syndicate - 
      a ruthless international criminal organization with ties to rogue states 
      and terrorist networks. They have one demand: complete global submission 
      to their rule, or they will ensure Russia's automated nuclear system 
      launches in exactly 24 hours.
      
      The Dead Hand system, designed during the Cold War, will automatically 
      launch Russia's entire nuclear arsenal at major cities worldwide if 
      not deactivated by authorized personnel. Only Svetlana's biometric 
      signature and authorization codes can stop it.
      
      World leaders are in panic. Military forces are mobilizing, but any 
      direct assault could trigger the system early. The world needs someone 
      who can work in the shadows, someone who can infiltrate the Syndicate 
      and rescue Svetlana before humanity faces extinction.
      
      The clock is ticking. 23 hours and 47 minutes remain.
      
      The fate of 8 billion people now rests in the hands of unlikely heroes...
    `,
    
    callToAction: "Choose your character and begin the most important mission in human history."
  },

  CHARACTER_BACKGROUNDS: {
    developer: {
      name: "Ammar Hassan",
      title: "Elite Software Engineer & Digital Forensics Expert",
      background: `
        A brilliant Pakistani software engineer working for a major tech company, 
        Ammar has spent years developing cybersecurity systems and digital 
        forensics tools. His expertise in hacking, satellite tracking, and 
        digital footprint analysis makes him uniquely qualified for this mission.
        
        Ammar's approach relies on technology and intelligence. He can:
        • Hack into surveillance systems to track the kidnappers
        • Use satellite imagery and digital forensics to locate hideouts
        • Infiltrate enemy communications and gather intelligence
        • Remain completely anonymous while conducting operations
        
        But he must be careful - the Shadow Syndicate has their own cyber 
        warfare specialists who are constantly trying to trace anyone 
        investigating them. One wrong move could expose his identity and 
        endanger the mission.
      `,
      specialAbilities: [
        "Digital Infiltration: Hack security systems and cameras",
        "Satellite Tracking: Use GPS and satellite data to locate targets",
        "Anonymous Operations: Remain undetected in digital space",
        "Counter-Hacking: Defend against enemy cyber attacks"
      ]
    },

    journalist: {
      name: "Nadia Volkov",
      title: "Investigative Journalist & Information Network Specialist",
      background: `
        A renowned Russian investigative journalist with connections throughout 
        Eastern Europe, Nadia has spent her career exposing corruption and 
        criminal networks. Her extensive network of sources and public persona 
        provide unique advantages in gathering intelligence.
        
        Nadia's approach relies on human intelligence and social networks:
        • Interview contacts and sources to gather information
        • Use her public status to access restricted areas
        • Build networks of informants within criminal organizations
        • Leverage media connections for real-time intelligence
        
        However, her public profile makes her vulnerable. The Syndicate's 
        spies are everywhere, and they're actively monitoring anyone asking 
        the wrong questions. She must carefully balance information gathering 
        with operational security.
      `,
      specialAbilities: [
        "Source Network: Access to informants and contacts",
        "Public Access: Use journalist credentials to enter restricted areas",
        "Information Analysis: Piece together clues from multiple sources",
        "Media Manipulation: Use news networks to spread disinformation"
      ]
    },

    agent: {
      name: "Marcus Steel",
      title: "Former Special Forces Operative",
      background: `
        A decorated former Navy SEAL turned private security contractor, 
        Marcus has extensive experience in hostage rescue and counter-terrorism 
        operations. His military training and combat expertise make him the 
        most direct approach to the mission.
        
        Marcus's approach relies on tactical operations and direct action:
        • Infiltrate enemy compounds using stealth and combat skills
        • Neutralize threats with precision and efficiency
        • Extract hostages from heavily guarded locations
        • Coordinate with international military forces
        
        While his methods are proven effective, they're also the most dangerous. 
        The Syndicate expects military intervention and has prepared accordingly. 
        One misstep could trigger early activation of the nuclear system.
      `,
      specialAbilities: [
        "Combat Mastery: Superior fighting and weapons skills",
        "Stealth Infiltration: Move undetected through enemy territory",
        "Tactical Planning: Coordinate complex rescue operations",
        "Survival Training: Operate in hostile environments"
      ]
    },

    hacker: {
      name: "Zero",
      title: "Anonymous Cyber Warfare Specialist",
      background: `
        Known only by the codename "Zero," this mysterious figure operates 
        from the shadows of the dark web. With unparalleled skills in cyber 
        warfare and electronic infiltration, Zero can manipulate digital 
        systems like a puppet master.
        
        Zero's approach relies on pure digital warfare:
        • Infiltrate and control enemy communication networks
        • Manipulate electronic security systems and infrastructure
        • Launch cyber attacks to disable enemy operations
        • Operate with complete anonymity and digital invisibility
        
        Zero's greatest strength is also their weakness - complete reliance 
        on technology. If the Syndicate operates in areas with limited 
        digital infrastructure, Zero's effectiveness diminishes significantly.
      `,
      specialAbilities: [
        "System Control: Take control of electronic infrastructure",
        "Digital Invisibility: Operate without leaving digital traces",
        "Cyber Warfare: Launch devastating digital attacks",
        "Network Infiltration: Access any connected system"
      ]
    }
  },

  LEVEL_NARRATIVES: {
    level1: {
      title: "THE TRAIL BEGINS",
      description: "Intelligence suggests the kidnappers fled Moscow heading west. Your first task is to track their movements and identify their next destination.",
      objective: "Eliminate the Syndicate's advance scouts and gather intelligence on their route."
    },

    level2: {
      title: "BORDER CROSSING",
      description: "The trail leads to the Belarus border. The Syndicate has established a smuggling operation here, moving Svetlana deeper into their territory.",
      objective: "Infiltrate the border operation and discover the location of their main stronghold."
    },

    level3: {
      title: "THE STRONGHOLD",
      description: "You've located their primary base of operations - an abandoned Soviet military facility. This is where they're holding Svetlana, but it's heavily fortified.",
      objective: "Breach the facility's defenses and locate the prisoner."
    },

    level4: {
      title: "THE INNER SANCTUM",
      description: "You're inside the facility, but Svetlana has been moved to the most secure section. The Syndicate's elite guards and automated defenses stand in your way.",
      objective: "Navigate the facility's deadliest security measures and reach the high-security detention area."
    },

    level5: {
      title: "FINAL CONFRONTATION",
      description: "You've found Svetlana, but the Syndicate's leader - a figure known only as 'The Shadow' - stands between you and escape. This enhanced super-soldier won't go down easily.",
      objective: "Defeat The Shadow and escape with Svetlana before the nuclear countdown reaches zero."
    }
  },

  VICTORY: {
    title: "MISSION ACCOMPLISHED",
    narrative: `
      VICTORY!
      
      Against all odds, you have succeeded. Svetlana Putin is safe, and with 
      mere minutes to spare, she has provided the authorization codes needed 
      to deactivate Russia's Dead Hand nuclear system.
      
      Around the world, people emerge from shelters and safe rooms, unaware 
      of how close they came to annihilation. The Shadow Syndicate's network 
      has been exposed and is being dismantled by international law enforcement.
      
      The immediate crisis is over, but the world has learned a valuable lesson 
      about the dangers of automated weapons systems and the importance of 
      international cooperation in the face of global threats.
      
      You have saved humanity itself. History will remember this day not as 
      the end of the world, but as the day heroes stepped forward when the 
      world needed them most.
      
      The nuclear countdown has been stopped.
      The world is safe.
      You are a hero.
    `,
    
    characterSpecific: {
      developer: "Your digital forensics skills and hacking expertise proved that sometimes the pen - or in this case, the keyboard - truly is mightier than the sword.",
      journalist: "Your network of sources and investigative instincts showed that information and truth are the most powerful weapons against darkness.",
      agent: "Your military training and tactical expertise demonstrated that sometimes direct action is the only way to save innocent lives.",
      hacker: "Your mastery of cyberspace proved that in the digital age, the greatest battles are fought in the realm of ones and zeros."
    }
  },

  GAME_OVER: {
    title: "HUMANITY'S FINAL HOUR",
    narrative: `
      MISSION FAILED
      
      The countdown has reached zero.
      
      Across the globe, early warning systems scream their final alerts as 
      Russia's Dead Hand system activates. Hundreds of nuclear missiles 
      launch simultaneously from silos across the vast Russian territory.
      
      In major cities worldwide - New York, London, Tokyo, Beijing, Mumbai, 
      São Paulo - people look up at the sky as streaks of light appear on 
      the horizon. Some pray, some cry, some simply hold their loved ones close.
      
      The nuclear exchange triggers a global response. Within hours, the 
      world's major nuclear powers have launched their own arsenals in 
      retaliation and desperation.
      
      The age of humanity ends not with a whimper, but with the brightest 
      flash the Earth has ever seen.
      
      In the aftermath, the planet falls silent. The Shadow Syndicate's 
      victory is pyrrhic - they have inherited a dead world.
      
      This is how the world ends.
      This is how civilization falls.
      This is the price of failure.
      
      Perhaps in another timeline, another hero succeeded where you failed.
      Perhaps there is still hope in the multiverse.
      
      But in this reality, humanity's story has come to an end.
    `,
    
    epilogue: "The last transmission from Earth was a simple message: 'We tried. We failed. Remember us.'"
  },

  GAMEPLAY_INSTRUCTIONS: {
    controls: {
      movement: "Arrow Keys - Move left/right",
      jump: "Space/Up Arrow - Jump",
      attack: "X Key - Attack enemies",
      interact: "Enter - Interact with objects/continue story"
    },
    
    objectives: [
      "Navigate through 5 increasingly difficult levels",
      "Defeat enemies and bosses using your character's unique abilities",
      "Manage your health and lives carefully - you only have 4 lives total",
      "Gather intelligence and clues specific to your character type",
      "Race against time to prevent nuclear annihilation"
    ],
    
    tips: [
      "Each character has different strengths - use them strategically",
      "Pay attention to enemy patterns and attack timing",
      "Some enemies require multiple hits to defeat",
      "Boss enemies have significantly more health and unique attacks",
      "The final boss 'The Shadow' is extremely dangerous - be prepared"
    ]
  }
};

export const getCharacterStory = (characterType: string) => {
  return STORY_SCRIPT.CHARACTER_BACKGROUNDS[characterType as keyof typeof STORY_SCRIPT.CHARACTER_BACKGROUNDS] || null;
};

export const getLevelStory = (level: number) => {
  const levelKey = `level${level}` as keyof typeof STORY_SCRIPT.LEVEL_NARRATIVES;
  return STORY_SCRIPT.LEVEL_NARRATIVES[levelKey] || null;
};

export const getVictoryStory = (characterType: string) => {
  const baseStory = STORY_SCRIPT.VICTORY.narrative;
  const characterSpecific = STORY_SCRIPT.VICTORY.characterSpecific[characterType as keyof typeof STORY_SCRIPT.VICTORY.characterSpecific] || "";
  
  return {
    narrative: baseStory,
    characterMessage: characterSpecific
  };
};
