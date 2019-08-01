var trivia = {
   QandA: [
        {
           Question: "The Lord of the Rings movies are based on a novel by what author?",
           CorrectAns: "J. R. R. Tolkien",
           Answers: [
               "George R. R. Martin", "J. R. R. Tolkien", "J. K. Rowling", "William Shakespeare"
           ]
        },
        {
           Question: "The only way to destroy the Ring of Power is to throw it into the fires of?",
           CorrectAns: "Mount Doom",
            Answers: [
                "Mount Zion", "Mount Doom", "Mount Mordor", "Mount Everest"
           ]
        },
        {
            Question: "Which of the following is NOT one of Gandalf's many nicknames?",
            CorrectAns: "Flame of Udun",
            Answers: [
                "The Grey Pilgrim", "Gandalf Greyhame", "Flame of Udun", "Gandalf Stormcrow"
            ]
        },
        {
            Question: "How does Frodo know Sam?",
            CorrectAns: "Sam is Frodo's gardener",
            Answers: [
                "Sam is Frodo's BFF", "Sam is Frodo's front-end developer", "Sam is Frodo's second cousin", "Sam is Frodo's gardener"
            ]
        },
        {
            Question: "Who is Aragorn in love with?",
            CorrectAns: "Arwen",
            Answers: [
                "Arwen", "Éowyn", "Elrond", "Himself"
            ]
        }
       
   ] 
};

console.log(trivia.QandA[1].Question);
console.log(trivia.QandA[0].Answers);
console.log(trivia.QandA[4].CorrectAns);

