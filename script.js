/* all container*/
const categoryContainer = document.getElementById("category-container");
const allNewsContainer = document.getElementById("all-news-container");
/* loading data*/

const loadCategory = async () => {
  const res = await fetch("https://news-api-fs.vercel.app/api/categories");
  const data = await res.json();
  displayCategory(data.categories);
};

const loadAllNews = async (categoryId) => {
  try {
    const res = await fetch(
      `https://news-api-fs.vercel.app/api/categories/${categoryId}`
    );
    const data = await res.json();
    displayAllNews(data.articles);
    allNewsContainer.classList.add("grid");
    if (data.articles.length === 0) {
      allNewsContainer.classList.remove("grid");
      allNewsContainer.innerHTML = `
      <div class="py-20 border border-gray-400 rounded-lg space-y-3">
      <h2 class="text-2xl text-center text-red-500">দুঃখিত !</h2>
      <h2 class="text-2xl text-center"><span class="mr-2 ">এ</span>বিষয়ে খবর পাওয়া যায় নি।</h2>
      </div>
      `;
    }
  } catch {
    allNewsContainer.classList.remove("grid");
    allNewsContainer.innerHTML = `
      <div class="py-20 border border-gray-400 rounded-lg space-y-3">
      <h2 class="text-4xl text-center text-red-500">Something Went Wrong !</h2>
      </div>
    `;
  }
};

/* display data*/

const displayCategory = (categories) => {
  categories.forEach((category) => {
    categoryContainer.innerHTML += ` 
    <li ><a href="#" id="${category.id}"  class=" border-b-4 border-transparent hover:border-red-500 cursor-pointer">${category.title}</a></li>
    `;
  });
};

const displayAllNews = (articles) => {
  allNewsContainer.innerHTML = "";
  articles.forEach((article) => {
    allNewsContainer.innerHTML += `
        <div class="flex-1 overflow-hidden  rounded-lg backdrop-blur-sm bg-white/10 border border-gray-200">
          <div
            class="bg-[url(${
              article.image.srcset[8].url
            })] h-50 bg-no-repeat bg-center bg-cover"
          ></div>
          <div class=" p-3 flex gap-3 flex-col justify-between">
            <h2 class="font-semibold text-lg ellipsis">
            ${article.title}
            </h2>
            <span class="font-normal text-sm text-gray-500">${
              article.time ? article.time : "অনির্দিষ্ট সময় আগে"
            }</span>
            <div class="flex justify-between ">
              <button class="btn btn-soft text-black">Bookmark</button>
              <button class="btn btn-soft text-black">View Details</button>
            </div>
          </div>
        </div>
    `;
  });
};

/* events */
categoryContainer.addEventListener("click", (e) => {
  const btn = e.target;
  const allCategory = document.querySelectorAll("#category-container li a");
  allCategory.forEach((categorey) => {
    categorey.classList.add("border-transparent");
    categorey.classList.remove("border-red-500");
  });
  if (btn.localName === "a") {
    loadAllNews(btn.id);
    btn.classList.remove("border-transparent");
    btn.classList.add("border-red-500");
  }
});


/* called function */

loadCategory();
loadAllNews("main");
