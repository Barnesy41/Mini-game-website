(function () {
    'use strict';
  
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
          const username = form.querySelector('#username');
          const dropdown = form.querySelector('#dropdown');
        
        // Check if username contains symbols
        if (username.value.match(/[^a-zA-Z0-9]/)) {
          username.setCustomValidity('invalid');
          event.preventDefault();
          event.stopPropagation();
        }
        else {
          username.setCustomValidity('');
        }
          
        // Check that the user selected an avatar
          if (dropdown.selectedIndex === 0) {
            dropdown.setCustomValidity('invalid');
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            dropdown.setCustomValidity('');
        }
        
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        form.classList.add('was-validated');
      }, false);
    });
  })();
