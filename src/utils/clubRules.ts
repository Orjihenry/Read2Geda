import type { ClubRule } from "./bookClub";

export function getClubRules(clubName: string): ClubRule[] {
  const name = clubName.toLowerCase();

  if (name.includes("book lovers united")) {
    return [
      {
        title: "Diverse Genres Welcome",
        description: "We read across all genres! Share your thoughts on any book, whether it's fiction, non-fiction, poetry, or graphic novels. Variety keeps our discussions fresh."
      },
      {
        title: "Respectful Disagreements",
        description: "Not everyone will love the same books, and that's okay! Share your honest opinions while respecting others' perspectives. Healthy debate enriches our community."
      },
      {
        title: "Reading Pace Flexibility",
        description: "We understand everyone reads at different speeds. Feel free to jump into discussions at any point, whether you're just starting or have finished the book."
      },
      {
        title: "Recommendation Sharing",
        description: "Found a hidden gem? Share it! We love discovering new books through member recommendations. Include why you think others might enjoy it."
      }
    ];
  }

  if (name.includes("sci-fi enthusiasts") || (name.includes("sci-fi") && !name.includes("fantasy"))) {
    return [
      {
        title: "Scientific Accuracy",
        description: "Feel free to discuss scientific concepts and their accuracy in the books. We love nerding out about physics, biology, and technology!"
      },
      {
        title: "World-Building Appreciation",
        description: "Share your thoughts on world-building, alien civilizations, and futuristic technologies. These elements are what make sci-fi special."
      },
      {
        title: "Hard vs Soft Sci-Fi",
        description: "Discuss the balance between scientific rigor and storytelling. Whether it's hard sci-fi or space opera, all approaches are welcome here."
      },
      {
        title: "Technology Speculation",
        description: "Explore how the technology in our reads might become reality. Discuss the feasibility and implications of futuristic concepts."
      }
    ];
  }

  if (name.includes("mystery solvers") || (name.includes("mystery") && !name.includes("historical"))) {
    return [
      {
        title: "Theories Welcome",
        description: "Share your theories and predictions as you read! We love seeing how different members piece together clues and suspects."
      },
      {
        title: "Character Analysis",
        description: "Discuss character motivations, red herrings, and plot twists. Analyze what makes characters suspicious or trustworthy."
      },
      {
        title: "Whodunit Discussions",
        description: "Share your suspect lists and reasoning! Track clues and evidence as you read through the mystery."
      },
      {
        title: "Puzzle Solving",
        description: "Work together to solve the mystery! Share your observations about clues, timelines, and inconsistencies you notice."
      }
    ];
  }

  if (name.includes("fantasy realm") || (name.includes("fantasy") && !name.includes("science") && !name.includes("fiction"))) {
    return [
      {
        title: "Magic System Discussions",
        description: "We love deep dives into magic systems, world-building, and lore. Share your thoughts on how the fantasy elements enhance the story."
      },
      {
        title: "Character Development",
        description: "Fantasy often features epic character arcs. Discuss character growth, relationships, and how they navigate their magical worlds."
      },
      {
        title: "Subgenre Appreciation",
        description: "Whether it's high fantasy, urban fantasy, or dark fantasy, share what draws you to different subgenres and how they're executed in our reads."
      },
      {
        title: "Mythology and Lore",
        description: "Explore the mythology, legends, and lore that authors create. Discuss how these elements add depth to the fantasy world."
      }
    ];
  }

  if (name.includes("historical fiction lovers") || (name.includes("historical") && !name.includes("mystery"))) {
    return [
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
      },
      {
        title: "Fact vs Fiction",
        description: "Explore where the author took creative liberties and how it serves the story. Historical accuracy discussions are always welcome."
      }
    ];
  }

  if (name.includes("literary critique")) {
    return [
      {
        title: "Deep Analysis Encouraged",
        description: "This is the place for detailed literary analysis. Discuss themes, symbolism, narrative techniques, and authorial intent in depth."
      },
      {
        title: "Multiple Interpretations",
        description: "Literary works have many valid interpretations. Share your unique perspective and engage thoughtfully with others' analyses."
      },
      {
        title: "Academic Approach",
        description: "Feel free to reference literary theory, critical essays, and scholarly perspectives. Academic rigor is welcome here."
      },
      {
        title: "Constructive Criticism",
        description: "Critical analysis of both strengths and weaknesses is encouraged. Support your points with textual evidence and thoughtful reasoning."
      }
    ];
  }

  if (name.includes("science fiction & fantasy") || name.includes("science fiction and fantasy")) {
    return [
      {
        title: "Genre Blending",
        description: "We explore the intersection of sci-fi and fantasy! Discuss how authors blend scientific concepts with magical elements, and what makes these hybrid works unique."
      },
      {
        title: "World-Building Depth",
        description: "Both genres excel at world-building. Share your thoughts on how authors construct their universes, whether through scientific rules or magical systems."
      },
      {
        title: "Genre Comparisons",
        description: "Compare how similar themes are explored differently in sci-fi vs fantasy. What works better in each genre?"
      },
      {
        title: "Hybrid Elements",
        description: "Discuss how authors balance scientific explanations with magical elements. When does the blend work best?"
      }
    ];
  }

  if (name.includes("dystopian") || name.includes("post-apocalyptic")) {
    return [
      {
        title: "World-Building Analysis",
        description: "Discuss how the dystopian world is constructed, what led to it, and how it compares to our own society."
      },
      {
        title: "Themes and Warnings",
        description: "Dystopian fiction often contains warnings about society. Share your thoughts on what the book is saying about our world."
      },
      {
        title: "Hope vs Despair",
        description: "Discuss the balance between bleakness and hope in these stories. How do characters find meaning in dark worlds?"
      },
      {
        title: "Social Commentary",
        description: "Explore the social and political commentary embedded in these stories. How do they reflect or critique current issues?"
      }
    ];
  }

  if (name.includes("romance novels")) {
    return [
      {
        title: "Trope Discussions",
        description: "Love discussing tropes? Share your favorite (or least favorite) romance tropes and how they're used in our current read."
      },
      {
        title: "Positive Environment",
        description: "This is a safe space to gush about your favorite moments, characters, and romantic developments. Spread the love!"
      },
      {
        title: "Representation Matters",
        description: "Discuss diverse representation in romance novels. Share thoughts on how different relationships and identities are portrayed."
      },
      {
        title: "Character Chemistry",
        description: "Analyze what makes the romantic relationships work. Discuss character dynamics, dialogue, and emotional connections."
      }
    ];
  }

  if (name.includes("young adult fiction") || name.includes("young adult") || name.includes("ya")) {
    return [
      {
        title: "Age-Appropriate Discussions",
        description: "We welcome readers of all ages. Keep discussions appropriate and remember that YA books often tackle important themes for young readers."
      },
      {
        title: "Themes and Messages",
        description: "YA literature often explores coming-of-age themes, identity, and social issues. Share how these themes resonate with you."
      },
      {
        title: "Relatability Factor",
        description: "Discuss how characters and situations relate to real-life experiences. YA often helps readers navigate their own challenges."
      },
      {
        title: "Voice and Perspective",
        description: "YA often features strong narrative voices. Discuss how the author captures the teenage perspective and what makes it authentic."
      }
    ];
  }

  if (name.includes("non-fiction bookworms") || name.includes("non-fiction") || name.includes("memoir")) {
    return [
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
      },
      {
        title: "Source Sharing",
        description: "If you've found related articles, studies, or books that complement our read, share them! We love expanding our knowledge."
      }
    ];
  }

  if (name.includes("literary classics")) {
    return [
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
      },
      {
        title: "Modern Relevance",
        description: "Explore how these classic works speak to contemporary issues. What makes them timeless?"
      }
    ];
  }

  if (name.includes("science & technology") || name.includes("science and technology")) {
    return [
      {
        title: "Scientific Accuracy",
        description: "Feel free to discuss scientific concepts and their accuracy. We love nerding out about physics, biology, technology, and innovation!"
      },
      {
        title: "Real-World Applications",
        description: "Connect the science in books to real-world technology and research. How do these concepts apply to our lives?"
      },
      {
        title: "Accessibility Matters",
        description: "Help make complex scientific concepts accessible to all members. Share explanations, analogies, or resources that clarify difficult topics."
      },
      {
        title: "Ethical Discussions",
        description: "Science and technology raise important ethical questions. Discuss the implications and responsibilities that come with scientific advancement."
      }
    ];
  }

  if (name.includes("travel literature")) {
    return [
      {
        title: "Travel Experience Sharing",
        description: "Share your own travel experiences related to the destinations in our books. Personal anecdotes bring the places to life!"
      },
      {
        title: "Cultural Context",
        description: "Discuss the cultural insights and perspectives presented in travel writing. How do authors navigate being outsiders in new places?"
      },
      {
        title: "Writing Style Appreciation",
        description: "Travel writing blends memoir, journalism, and storytelling. Discuss how authors craft their narratives and capture a sense of place."
      },
      {
        title: "Wanderlust Discussions",
        description: "Share which destinations from our reads you'd love to visit, or how the books have changed your perspective on travel."
      }
    ];
  }

  if (name.includes("literary fiction") && !name.includes("classic") && !name.includes("critique")) {
    return [
      {
        title: "Character Depth",
        description: "Literary fiction often focuses on character development and internal journeys. Discuss how characters evolve and what drives them."
      },
      {
        title: "Writing Craft",
        description: "Appreciate the artistry of the prose. Discuss narrative techniques, structure, and how the author's style serves the story."
      },
      {
        title: "Thematic Exploration",
        description: "Explore the deeper themes and questions the book raises. Literary fiction often tackles complex human experiences and social issues."
      },
      {
        title: "Ambiguity and Interpretation",
        description: "Literary fiction may leave things open to interpretation. Share your thoughts on ambiguous endings or unresolved questions."
      }
    ];
  }

  if (name.includes("historical mystery")) {
    return [
      {
        title: "Period Accuracy",
        description: "Discuss how the historical setting enhances the mystery. Does the time period create unique constraints or opportunities for the plot?"
      },
      {
        title: "Historical Context Clues",
        description: "Share how historical details might be clues themselves. How does knowledge of the period help solve the mystery?"
      },
      {
        title: "Blending Genres",
        description: "Discuss how the author balances historical accuracy with compelling mystery storytelling. What makes historical mysteries unique?"
      },
      {
        title: "Period-Specific Investigation",
        description: "Explore how investigation methods differ in historical settings. How do characters solve mysteries without modern technology?"
      }
    ];
  }

  return [];
}

