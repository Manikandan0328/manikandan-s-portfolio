// Smooth scrolling for navigation links
$(document).ready(function () {
  $(".nav-link, .btn, goToTopBtn, .scroll-down a").click(function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 70,
      },
      500
    );
  });
  // Scroll to top when clicking the brand link
  $(".navbar-brand").click(function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
});
// Smooth scroll for navbar brand
document
  .querySelector(".navbar-brand")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector("html, body")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });

function sendEmail() {
  var name = document.getElementById("your_name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Check if name and email are not empty
  if (name.trim() === "") {
    alert("Please enter your name");
    return;
  }
  if (email.trim() === "") {
    alert("Please enter your email");
    return;
  }

  // Validate email format
  var emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Check if message is not empty
  if (message.trim() === "") {
    alert("Please enter your message");
    return;
  }

  // Construct email body
  var mailtoLink =
    "mailto:smanikandanmani123@gmail.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\nMessage: " + message
    );

  // Open default email client with pre-filled data
  window.location.href = mailtoLink;
}
// Function to handle Enter key press event
function handleEnterKeyPress(event, nextElementId) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission

    var currentInput = event.target;
    var inputValue = currentInput.value.trim();

    if (currentInput.id === "email") {
      // Validate email format
      var emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(inputValue)) {
        alert("Please enter a valid email address");
        return;
      }
    }

    document.getElementById(nextElementId).focus(); // Move focus to the next input field
  }
}

// Add event listeners to input fields
document.getElementById("your_name").addEventListener("keypress", function(event) {
  handleEnterKeyPress(event, "email");
});

document.getElementById("email").addEventListener("keypress", function(event) {
  handleEnterKeyPress(event, "subject");
});

document.getElementById("subject").addEventListener("keypress", function(event) {
  handleEnterKeyPress(event, "message");
});


// JavaScript code for animations on scroll
 window.addEventListener('scroll', () => {
   const elements = document.querySelectorAll('.animated');
   elements.forEach(element => {
     if (isElementInViewport(element)) {
       const animation = element.getAttribute('data-animation');
       const delay = element.getAttribute('data-delay') || '0s';
       element.style.animationDelay = delay;
       element.classList.add(animation);
     }
   });
 });
 function isElementInViewport(el) {
   const rect = el.getBoundingClientRect();
   return (
     rect.top >= 0 &&
     rect.left >= 0 &&
     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
 }

 
// JavaScript to close navbar after clicking a menu item
// Smooth scrolling for anchor links
//  $(document).ready(function () {
//    $("a.nav-link , .navbar-brand").on("click", function (e) {
//      if (this.hash !== "") {
//        e.preventDefault();
//        const hash = this.hash;
//        $("html, body").animate(
//          {
//            scrollTop: $(hash).offset().top,
//          },
//          800,
//          function () {
//            window.location.hash = hash;
//          }
//        );
//      }
//      // Collapse navbar after click
//      $(".navbar-collapse").collapse("hide");
//    });
//  });

$(document).ready(function () {
  // Toggle navbar function
  function toggleNavbar() {
    const navbarCollapse = $(".navbar-collapse");
    if (navbarCollapse.hasClass("show")) {
      navbarCollapse.removeClass("show");
    } else {
      navbarCollapse.addClass("show");
    }
  }

  // Smooth scroll to section and close navbar
  $("a.nav-link, .navbar-brand").on("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
    // Close navbar after click
    $(".navbar-collapse").removeClass("show");
  });

  // Toggle navbar on menu icon click
  $(".navbar-toggler").on("click", function (e) {
    e.stopPropagation();
    toggleNavbar();
  });

  // Close navbar when clicking outside of it
  $(document).on("click", function (e) {
    const targetElement = $(e.target);
    const navbarCollapse = $(".navbar-collapse");
    const navbarToggler = $(".navbar-toggler");

    if (
      !targetElement.closest(navbarCollapse).length &&
      !targetElement.closest(navbarToggler).length &&
      navbarCollapse.hasClass("show")
    ) {
      navbarCollapse.removeClass("show");
    }
  });
});


 


//increace skill
 $(document).ready(function () {
   $(".progress-bar").each(function () {
     var width = $(this).data("width");
     $(this).css("width", width + "%");
   });
 });

 //goto top
// Get the button
var goToTopButton = document.getElementById("goToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopButton.style.display = "block";
  } else {
    goToTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling behavior
  });
}


// Activate the carousel
$('#projectCarousel').carousel({
  interval: false
});

