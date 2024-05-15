function projectFetch(id) {
  data = {};
  switch (id) {
    case 0:
      data = {
        title: "Long Distance Love Tips",
        photoURL: ["assets/carousel-1/c1.png", "assets/carousel-1/c2.png", "assets/carousel-1/c3.png", "assets/carousel-1/c4.png", "assets/carousel-1/c5.png" ,"assets/carousel-1/c6.png", "assets/carousel-1/c7.png"],
        description: "Graphics Design with Canva",
        members: ["Mendoza, Kyn M."],
      };
      break;
    case 1:
      data = {
        title: "Date Night Ideas",
        photoURL: ["assets/carousel-2/c1.png", "assets/carousel-2/c2.png", "assets/carousel-2/c3.png", "assets/carousel-2/c4.png", "assets/carousel-2/c5.png", "assets/carousel-2/c6.png", "assets/carousel-2/c7.png"],
        description: "Graphics Design with Canva",
        members: ["Mendoza, Kyn M."],
      };
      case 2:
        data = {
          title: "Unit Listing",
          photoURL: ["assets/carousel-3/c1.png", "assets/carousel-3/c2.png", "assets/carousel-3/c3.png", "assets/carousel-3/c4.png"],
          description: "Graphics Design with Canva",
          members: ["Mendoza, Kyn M."],
        };
      break;
    default:
      data = {
        photoURL: [],
        description: "",
        members: [],
      };
  }

  showProjectModal(data);
}

function showProjectModal(data) {
  modal.style.display = "block";
  
  $("#projectTitle").html(data.title);
  $("#projectDescription").html(data.description);

  var members = "";
  data.members.forEach((member) => {
    members = `${members}<li>${member}</li>`;
  });

  $("#projectMembers").html(members);

  $("#projectGallery").html("");

  var galleryHead = '<div id="my-keen-slider" class="keen-slider">';

  var galleryBody = "";
  data.photoURL.forEach((url, i) => {
    galleryBody = `${galleryBody}<img
      src="${url}"
      class="keen-slider__slide number-slide${i+1}"
      alt=""
    />`;
  });

  console.log(galleryBody);

  var galleryFooter = `</div>

          <script src="https://cdn.jsdelivr.net/npm/keen-slider@6.8.5/keen-slider.min.js"></script>
          <script>
            var slider = new KeenSlider(
              "#my-keen-slider",
              {
                loop: true,
              },
              [
                (slider) => {
                  let timeout;
                  let mouseOver = false;
                  function clearNextTimeout() {
                    clearTimeout(timeout);
                  }
                  function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                      slider.next();
                    }, 1500);
                  }
                  slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                      mouseOver = true;
                      clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                      mouseOver = false;
                      nextTimeout();
                    });
                    nextTimeout();
                  });
                  slider.on("dragStarted", clearNextTimeout);
                  slider.on("animationEnded", nextTimeout);
                  slider.on("updated", nextTimeout);
                },
              ]
            );
          </script>
  `;

  $("#projectGallery").html(`${galleryHead} ${galleryBody} ${galleryFooter}`);
}
