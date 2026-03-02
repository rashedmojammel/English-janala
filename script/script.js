const loadData = () =>{
   fetch("https://openapi.programming-hero.com/api/levels/all")
   .then((res) => res.json())
   .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) =>
{
    console.log(lessons);

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = " ";

    for(let lesson of lessons)
    {
        const btndiv =  document.createElement("div");
        btndiv.innerHTML = `
         <button class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        
        `
        levelContainer.appendChild(btndiv);
    }


}
loadData();