const createElements = (arr) => {
  if (!arr || arr.length === 0) {
    // no synonyms at all
    return `<span class="btn">No Synonyms Found</span>`;
  }

  // create one button per synonym
  const htmlElements = arr.map(el => `<span class="btn">${el}</span>`).join(" ");
  return htmlElements;
};
const loadData = () =>{
   fetch("https://openapi.programming-hero.com/api/levels/all")
   .then((res) => res.json())
   .then((json) => displayLessons(json.data));
};

const manageSpinner = (status) =>
{
  const loadingElement = document.getElementById("spinner");
  if(status === true)
  {
    loadingElement.classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
    
  }
  else
  {
   loadingElement.classList.add("hidden");
   document.getElementById("word-container").classList.remove("hidden");

  }

}


const loadLevelWord = (id) =>
{
  manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        
        const clickbtn = document.getElementById(`lesson-btn-${id}`)
        console.log(clickbtn);
        clickbtn.classList.add("active");
        displayLevelWord(data.data)});
}

const removeActive = () =>
{
    const rembtn = document.querySelectorAll(".lesson-btn");
    rembtn.forEach((btn) => btn.classList.remove("active"));
    console.log(rembtn);
}

const loadWordDetails = async(id) =>
{
  
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);

}

const displayWordDetails = (word) =>
{
  
  console.log(word);
  const wordDetails = document.getElementById("details-container");
  wordDetails.innerHTML = `
  <div>
        <h1 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h1>
      </div>
      <div>
        <h1 class="font-bold">Meaning</h1>
        <p>${word.meaning}</p>
      </div>
      <div>
        <h1 class="font-bold">Example</h1>
        <P>${word.sentence}</P>
      </div>
      <div>
        <h1 class="font-bold">সমার্থক শব্দ গুলো</h1>
        <div class="">${createElements(word.synonyms)}</div>
      </div>
      <button class="btn btn-primary">Complete Learning</button>`;
  document.getElementById("word_modal").showModal();

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
      manageSpinner(false);
      return false;
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
          <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
    manageSpinner(false);
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
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        
        `
        levelContainer.appendChild(btndiv);
    }


}
loadData();