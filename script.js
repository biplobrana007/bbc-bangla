/* all container*/
const categoryContainer = document.getElementById("category-container");

/* loading data*/

const loadCategory = async () => {
  const res = await fetch("https://news-api-fs.vercel.app/api/categories");
  const data = await res.json();
  displayCategory(data.categories);
};

/* display data*/

const displayCategory = (categories) => {
  categories.forEach((category) => {
    categoryContainer.innerHTML += ` 
    <li id="${category.id}" ><a href="" class=" border-b-4 border-transparent hover:border-red-500 ">${category.title}</a></li>
    `;
  });
};

/* called function */

loadCategory();
