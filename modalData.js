function projectFetch(id) {
  data = {};
  switch (id) {
    case 0:
      data = {
        title: "Edukista",
        photoURL: ["assets/projects/project-1.png", "images/2.png", "images/3.png"],
        description: "Lorem Ipsum dolor sit itzem",
        members: ["Mendoza, Kyn M."],
      };
      break;
    case 1:
      data = {
        title: "StickyGo",
        photoURL: ["images/1.png", "images/2.png", "images/3.png"],
        description: "Lorem Ipsum dolor sit itzem",
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
