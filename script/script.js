const loadData = () =>{
   fetch("https://openapi.programming-hero.com/api/levels/all")
   .then((res) => res.json())
   .then((json) => displayLessons(json.data));
};


const loadLevelWord = (id) =>
{
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
}
const displayLevelWord = (words) =>
{
    console.log(words)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML=" ";

    if(words.length == 0){
        wordContainer.innerHTML=` <div
        class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png">
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>`;
    }

    for(let word of words)
    {
        const btndiv2 = document.createElement("div");
        btndiv2.innerHTML=`
         <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"
    }"</div> 
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${
            word.word
          }')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>`
      wordContainer.appendChild(btndiv2);
    }
}


const displayLessons = (lessons) =>
{
    console.log(lessons);

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = " ";

    for(let lesson of lessons)
    {
        const btndiv =  document.createElement("div");
        btndiv.innerHTML = `
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        
        `
        levelContainer.appendChild(btndiv);
    }


}
loadData();