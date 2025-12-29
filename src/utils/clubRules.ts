import type { ClubRule } from "./bookClub";

export function getClubRules(clubName: string): ClubRule[] {
  const name = clubName.toLowerCase();
  
  const defaultRules: ClubRule[] = [
    {
      title: "Respectful Discussions",
      description: "Always maintain a respectful and inclusive environment. Disagreements are welcome, but personal attacks or disrespectful language are not tolerated."
    },
    {
      title: "Active Participation",
      description: "Members are encouraged to actively participate in discussions and share their thoughts. Your unique perspective enriches our reading experience."
    },
    {
      title: "Reading Pace",
      description: "We understand everyone reads at different speeds. Feel free to participate in discussions even if you haven't finished the book, but please mark spoilers appropriately."
    }
  ];

  if (name.includes("sci-fi") || name.includes("science fiction")) {
    return [
      ...defaultRules,
      {
        title: "Spoiler Protocol",
        description: "When discussing plot twists, time travel paradoxes, or major reveals, always use spoiler tags. We want everyone to enjoy the journey, not just the destination."
      },
      {
        title: "Scientific Accuracy",
        description: "Feel free to discuss scientific concepts and their accuracy in the books. We love nerding out about physics, biology, and technology!"
      },
      {
        title: "World-Building Appreciation",
        description: "Share your thoughts on world-building, alien civilizations, and futuristic technologies. These elements are what make sci-fi special."
      }
    ];
  }

  if (name.includes("mystery") || name.includes("crime")) {
    return [
      ...defaultRules,
      {
        title: "No Spoilers Policy",
        description: "Absolutely no spoilers in discussion titles or initial posts. Use spoiler tags for any plot reveals, clues, or solutions. Let everyone solve the mystery themselves!"
      },
      {
        title: "Theories Welcome",
        description: "Share your theories and predictions as you read! We love seeing how different members piece together clues and suspects."
      },
      {
        title: "Character Analysis",
        description: "Discuss character motivations, red herrings, and plot twists. Just remember to mark spoilers for those who haven't reached that point yet."
      }
    ];
  }

  if (name.includes("fantasy")) {
    return [
      ...defaultRules,
      {
        title: "Magic System Discussions",
        description: "We love deep dives into magic systems, world-building, and lore. Share your thoughts on how the fantasy elements enhance the story."
      },
      {
        title: "Character Development",
        description: "Fantasy often features epic character arcs. Discuss character growth, relationships, and how they navigate their magical worlds."
      },
      {
        title: "Spoiler Etiquette",
        description: "Mark spoilers for major plot points, character deaths, or world revelations. We want everyone to experience the magic for themselves."
      }
    ];
  }

  if (name.includes("historical")) {
    return [
      ...defaultRules,
      {
        title: "Historical Context",
        description: "Feel free to discuss the historical accuracy, period details, and how the author weaves real events into the narrative."
      },
      {
        title: "Research Sharing",
        description: "If you've done additional research about the time period or events, share it! We love learning more about the historical backdrop."
      },
      {
        title: "Character Authenticity",
        description: "Discuss how characters reflect their time period and whether their actions and beliefs feel authentic to the era."
      }
    ];
  }

  if (name.includes("romance")) {
    return [
      ...defaultRules,
      {
        title: "Spoiler-Free Zone",
        description: "Keep endings and major relationship developments under wraps. Use spoiler tags liberally so everyone can enjoy the romantic journey."
      },
      {
        title: "Trope Discussions",
        description: "Love discussing tropes? Share your favorite (or least favorite) romance tropes and how they're used in our current read."
      },
      {
        title: "Positive Environment",
        description: "This is a safe space to gush about your favorite moments, characters, and romantic developments. Spread the love!"
      }
    ];
  }

  if (name.includes("young adult") || name.includes("ya")) {
    return [
      ...defaultRules,
      {
        title: "Age-Appropriate Discussions",
        description: "We welcome readers of all ages. Keep discussions appropriate and remember that YA books often tackle important themes for young readers."
      },
      {
        title: "Themes and Messages",
        description: "YA literature often explores coming-of-age themes, identity, and social issues. Share how these themes resonate with you."
      },
      {
        title: "Spoiler Awareness",
        description: "Be extra careful with spoilers - many members might be reading these books for the first time. Use spoiler tags generously."
      }
    ];
  }

  if (name.includes("non-fiction") || name.includes("memoir")) {
    return [
      ...defaultRules,
      {
        title: "Fact-Checking Welcome",
        description: "Feel free to discuss the accuracy of information presented. Share additional sources or perspectives that enhance understanding."
      },
      {
        title: "Personal Connections",
        description: "Non-fiction often resonates personally. Share how the book relates to your own experiences or changed your perspective."
      },
      {
        title: "Critical Analysis",
        description: "We encourage critical thinking about the author's arguments, evidence, and conclusions. Respectful debate is welcome."
      }
    ];
  }

  if (name.includes("classic") || name.includes("literary")) {
    return [
      ...defaultRules,
      {
        title: "Literary Analysis",
        description: "Deep dives into themes, symbolism, and literary techniques are encouraged. Share your interpretations and analysis."
      },
      {
        title: "Historical Significance",
        description: "Discuss the book's place in literary history, its influence on other works, and its relevance today."
      },
      {
        title: "Multiple Perspectives",
        description: "Classic literature often has many interpretations. Share your unique perspective and be open to others' viewpoints."
      }
    ];
  }

  if (name.includes("dystopian") || name.includes("post-apocalyptic")) {
    return [
      ...defaultRules,
      {
        title: "World-Building Analysis",
        description: "Discuss how the dystopian world is constructed, what led to it, and how it compares to our own society."
      },
      {
        title: "Themes and Warnings",
        description: "Dystopian fiction often contains warnings about society. Share your thoughts on what the book is saying about our world."
      },
      {
        title: "Spoiler Protocol",
        description: "Major plot twists and world revelations should be marked with spoiler tags. Let everyone discover the dystopia at their own pace."
      }
    ];
  }

  return defaultRules;
}

