$(document).ready(function () {
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("Niste prijavljeni.");
    window.location.href = "login.html";
    return;
  }

  const subjectMap = {};

  async function loadCurriculumList() {
    try {
      const res = await fetch(
        "https://www.fulek.com/data/api/supit/curriculum-list/hr",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Nije moguće dohvatiti kolegije.");
      const data = await res.json();

      $("#subject").empty();
      data.data.forEach((course) => {
        subjectMap[course.kolegij] = course.id;
        $("#subject").append(`<option value="${course.kolegij}"></option>`);
      });
    } catch (err) {
      console.error("Greška:", err);
    }
  }

  loadCurriculumList();

  $("#search-input").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      const name = $(this).val().trim();
      const id = subjectMap[name];

      if (id) {
        loadCourseDetails(id);
        $(this).val("");
      } else {
        alert("Kolegij nije pronađen.");
      }
    }
  });

  async function loadCourseDetails(id) {
    try {
      const res = await fetch(
        `https://www.fulek.com/data/api/supit/get-curriculum/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Ne mogu dohvatiti detalje kolegija.");
      const data = await res.json();
      const c = data.data;

      const row = `
          <tr id="row-${c.id}">
            <td>${c.courseName}</td>
            <td class="ects">${c.ects}</td>
            <td class="hours">${c.numberOfLectures + c.numberOfPractice}</td>
            <td class="lectures">${c.numberOfLectures}</td>
            <td class="exercises">${c.numberOfPractice}</td>
            <td>${c.type}</td>
            <td><button class="remove-btn" data-id="${
              c.id
            }">Delete</button></td>
          </tr>
        `;

      $("#selected-curriculum-table tbody").append(row);
      ensureTotalsRow();
      updateTotals();
    } catch (err) {
      console.error("Greška:", err);
    }
  }

  function ensureTotalsRow() {
    if ($("#totals-row").length === 0) {
      const totals = `
          <tr id="totals-row">
            <td><strong>Ukupno</strong></td>
            <td id="total-ects">0</td>
            <td id="total-hours">0</td>
            <td id="total-lectures">0</td>
            <td id="total-exercises">0</td>
            <td></td><td></td>
          </tr>
        `;
      $("#selected-curriculum-table tbody").append(totals);
    } else {
      $("#totals-row").appendTo("#selected-curriculum-table tbody");
    }
  }

  function updateTotals() {
    let ects = 0,
      hours = 0,
      lectures = 0,
      exercises = 0;

    $("#selected-curriculum-table tbody tr").each(function () {
      ects += parseInt($(this).find(".ects").text()) || 0;
      hours += parseInt($(this).find(".hours").text()) || 0;
      lectures += parseInt($(this).find(".lectures").text()) || 0;
      exercises += parseInt($(this).find(".exercises").text()) || 0;
    });

    $("#total-ects").text(ects);
    $("#total-hours").text(hours);
    $("#total-lectures").text(lectures);
    $("#total-exercises").text(exercises);

    if ($("#selected-curriculum-table tbody tr").length <= 1) {
      $("#totals-row").remove();
    }
  }

  $("#selected-curriculum-table").on("click", ".remove-btn", function () {
    const id = $(this).data("id");
    $(`#row-${id}`).remove();
    updateTotals();
  });
});
