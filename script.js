let allDataStore;
const loadData = async (isTrue) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allDataStore = data.data.tools;
      displayData(data.data.tools, isTrue);
    });
};
const displayData = (allData, isTrue) => {
  const mainContainer = document.getElementById("main-content");
  allData = allData.slice(0, 6);
  if (isTrue === true) {
    mainContainer.innerHTML = "";
    allData = allDataStore;
    document.getElementById("see-more-btn").style.display = "none";
  }
  allData.forEach((data) => {
    const { features, image, name, published_in, id } = data;
    // Looping on features list and show inside ol
    const featureList = (features) => {
      let li = ``;
      features.forEach((feature) => {
        li += `<li>${feature}</li>`;
      });
      return li;
    };
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card h-100">
              <img src="${image}" class="card-img-top" alt="..." height="210" />
              <div class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
              <div>
              <ol type="1" class="ps-4">
              ${featureList(features)}
              </ol>
              </div>
              <div class="d-flex justify-content-between align-items-center border-top mt-3 pt-3">
                  <div>
                     <h6 class="fw-semibold">${name}</h6>
                     <p class="d-flex justify-content-between mb-0"><i class="ri-calendar-line me-2"></i> ${published_in}</p>
                   </div
                   <div>
                       <button class="btn text-danger" data-bs-toggle="modal"
                           data-bs-target="#universe" onclick="loadSingleData('${id}')"><i class="ri-arrow-right-line"></i>
                        </button>
                   </div>
              </div>
              </div>
            </div>
     `;
    mainContainer.appendChild(div);
  });
};
// Show All data function
const showMoreData = () => {
  let isTrue = true;
  loadData(isTrue);
};

// Single data fetch function

const loadSingleData = async (dataId) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${dataId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displaySingleData(data.data);
    });
};

const displaySingleData = (singleData) => {
  console.log(singleData);
  const {
    accuracy,
    description,
    features,
    image_link,
    pricing,
    integrations,
    input_output_examples,
  } = singleData;

  // integrationList list item find out through the loop
  const integrationList = (integrations) => {
    let li = ``;
    if (integrations) {
      integrations.forEach((feature) => {
        li += `<li>${feature}</li>`;
      });
    } else {
      li += `No Data Found`;
    }
    return li;
  };
  // Feature list item find out through the loop
  const featureListSingle = (features) => {
    let li = ``;
    if (features) {
      for (const feature in features) {
        let listText = features[`${feature}`].feature_name;
        li += `<li>${listText}</li>`;
      }
    } else {
      li += `No Data Found`;
    }
    return li;
  };
  const singleDataContainer = document.getElementById("modal-body");
  singleDataContainer.innerHTML = `
   <div
                  class="left-content-wrapper border border-danger rounded-3 p-4 col"
                >
                  <h3 class="fw-semibold">
                   ${description ? description : "No Content Found"}
                  </h3>
                  <div
                    class="d-lg-flex justify-content-around text-lg-center mt-5"
                  >
                    <h5 class="text-success fw-semibold">
                    <span>${pricing ? pricing[0].price : ""}</span> ${
    pricing ? pricing[0].plan : ""
  }
                    </h5>
                   <h5 class="text-success fw-semibold">
                    <span>${pricing ? pricing[1].price : ""}</span> ${
    pricing ? pricing[1].plan : ""
  }
                    </h5>
                    <h5 class="text-success fw-semibold">
                    <span>${pricing ? pricing[2].price : ""}</span> ${
    pricing ? pricing[2].plan : ""
  }
                    </h5>
                  </div>

                  <div
                    class="d-lg-flex justify-content-between mt-5"
                    id="single-feauture-details"
                  >
                    <div>
                      <h4 class="fw-semibold">Features</h4>
                      <ul>
                      ${featureListSingle(features)}
                      
                      </ul>
                    </div>
                    <div>
                      <h4 class="fw-semibold">Integrations</h4>
                      <ul>
                       ${integrationList(integrations)}
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="right-content-wrapper px-5 col text-center">
                  <div class="position-relative">
                    <img src="${
                      image_link ? image_link[0] : "No Image"
                    }" style="width: 100%" alt="" />
                    <button
                      class="btn btn-danger position-absolute"
                      style="top: 3%; right: 12%"
                    >
                      ${accuracy.score ? accuracy.score + " Accuracy" : ""}
                    </button>
                  </div>
                   <h4 class="fw-semibold mt-3">${
                     input_output_examples
                       ? input_output_examples[0].input
                       : "No data"
                   }</h4>
                  <p class="px-3">
                   ${
                     input_output_examples
                       ? input_output_examples[0].output
                       : "No! Not Yet! Take a break!!!"
                   }
                  </p>
                </div>
  `;
};
const sortByData = async () => {
  const URL = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(URL);
  const data = await res.json();
  const sortedData = data.data.tools.sort(
    (a, b) => new Date(b.published_in) - new Date(a.published_in)
  );
  displayData(sortedData);
};

loadData();
