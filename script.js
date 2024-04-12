const api='96a694f8650342df94ba98c4700adc5c';
const main2 = document.getElementById("main2");
const search=document.getElementById("searcher");
const searchb=document.getElementById("sbut");

async function fetchR(){
    try{
         const url= `https://newsapi.org/v2/everything?q=india&pagesize=100&apikey=${api}`
         const resp = await fetch(url)
         const data = await resp.json()
         return data.articles
    }catch(error){
        console.error("error featching the ramdome new from the api",error)
        return[]
    }
}

searchb.addEventListener("click",async ()=>{
    const q=search.value.trim();
    if(q!=""){
        try{
            const articles =await featchNewsq(q)
            display(articles)
        }catch(error){
            console.log("Error while searching",error);
        }
    }
})

async function featchNewsq(q){
    try{
        const url= `https://newsapi.org/v2/everything?q=${q}&pagesize=100&apikey=${api}`
        const resp = await fetch(url)
        const data = await resp.json()
        return data.articles
   }catch(error){
       console.error("error featching the ramdome new from the api",error)
       return[]
   }
}
function display(articles){
    main2.innerHTML="";
    articles.forEach((article)=>{
        const box = document.createElement("div")
        box.classList.add("box")
        const img=document.createElement("img")
        img.src =article.urlToImage
        img.alt=article.title
        const title=document.createElement("div")
        const new1 = article.title.length>30?article.title.slice(0,30)+"....":article.title;
        title.textContent=new1;
        const des =document.createElement("div")
        const new2 = article.description.length>120?article.description.slice(0,120)+"....":article.description;
        des.textContent=new2;

        box.appendChild(img);
        box.appendChild(title);
        box.appendChild(des);
        box.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        });
        main2.appendChild(box);
    });
}


(async()=>{
    try{
        const articles =await fetchR();
        display(articles);
    }catch(error){
        console.error("error featching the ramdome new from the api",error)
    }
})();