
    // 1. GENERATE BACKGROUND TWINKLING STARS
    // =====================================================
    (function createBackgroundStars() {
      const container = document.getElementById('bgStars');
      const starCount = 90;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('bg-star');

        // Random size: 1px to 3px
        const size = (Math.random() * 2.5 + 1).toFixed(1);
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Random position
        star.style.top = (Math.random() * 100) + '%';
        star.style.left = (Math.random() * 100) + '%';

        // Random animation duration: 1.5s to 5s
        const duration = (Math.random() * 3.5 + 1.5).toFixed(2);
        star.style.setProperty('--dur', duration + 's');

        // Random delay
        const delay = (Math.random() * 4).toFixed(2);
        star.style.setProperty('--delay', delay + 's');

        container.appendChild(star);
      }
    })();

    // =====================================================
    // 2. GENERATE STARS PYRAMID
    // =====================================================
    function generatePyramid(totalRows) {
      let pyramidString = '';
      for (let row = 1; row <= totalRows; row++) {
        // Calculate spaces before stars
        const spaces = totalRows - row;
        // Calculate number of stars: 1, 3, 5, 7, 9, ...
        const stars = 2 * row - 1;

        // Build the row
        let rowString = '';
        // Add leading spaces
        for (let s = 0; s < spaces; s++) {
          rowString += ' ';
        }
        // Add stars
        for (let st = 0; st < stars; st++) {
          rowString += '*';
        }
        // Add trailing spaces (optional, for symmetry)
        for (let s = 0; s < spaces; s++) {
          rowString += ' ';
        }

        pyramidString += rowString;
        if (row < totalRows) {
          pyramidString += '\n';
        }
      }
      return pyramidString;
    }

    // Insert pyramid into the display element
    const pyramidDisplay = document.getElementById('pyramid-display');
    const PYRAMID_ROWS = 9;
    pyramidDisplay.textContent = generatePyramid(PYRAMID_ROWS);

    // =====================================================
    // 3. MOCK USER DATABASE
    // =====================================================
    const mockUsers = [
      { username: 'admin', password: 'admin123', role: 'Administrator' },
      { username: 'user', password: 'user123', role: 'Standard User' },
      { username: 'guest', password: 'guest123', role: 'Guest' },
    ];

    // =====================================================
    // 4. LOGIN VALIDATION USING SWITCH CASE
    // =====================================================
    function validateLogin(usernameInput, passwordInput) {
      // Determine the status code based on input and mock data
      let statusCode;

      // Check for empty fields
      if (usernameInput.trim() === '' && passwordInput.trim() === '') {
        statusCode = 'BOTH_EMPTY';
      } else if (usernameInput.trim() === '') {
        statusCode = 'USERNAME_EMPTY';
      } else if (passwordInput.trim() === '') {
        statusCode = 'PASSWORD_EMPTY';
      } else {
        // Search for user in mock database
        const foundUser = mockUsers.find(
          (u) => u.username.toLowerCase() === usernameInput.trim().toLowerCase()
        );

        if (!foundUser) {
          statusCode = 'USER_NOT_FOUND';
        } else if (foundUser.password !== passwordInput.trim()) {
          statusCode = 'WRONG_PASSWORD';
        } else {
          statusCode = 'SUCCESS';
        }
      }

      // ---- SWITCH CASE to handle each status ----
      switch (statusCode) {
        case 'BOTH_EMPTY':
          alert('⚠️  Both fields are empty!\n\nPlease enter your username and password to continue.');
          break;

        case 'USERNAME_EMPTY':
          alert('⚠️  Username is required!\n\nPlease enter your username.');
          break;

        case 'PASSWORD_EMPTY':
          alert('⚠️  Password is required!\n\nPlease enter your password.');
          break;

        case 'USER_NOT_FOUND':
          alert(
            '❌  User Not Found!\n\n' +
            'The username "' + usernameInput.trim() + '" does not exist in our records.\n\n' +
            '💡 Try one of these:\n' +
            '   • admin / admin123\n' +
            '   • user / user123\n' +
            '   • guest / guest123'
          );
          break;

        case 'WRONG_PASSWORD':
          alert(
            '❌  Incorrect Password!\n\n' +
            'The password you entered for "' + usernameInput.trim() + '" is incorrect.\n\n' +
            '🔐 Please double-check and try again.'
          );
          break;

        case 'SUCCESS':
          // Find the user again to get role info
          const loggedInUser = mockUsers.find(
            (u) => u.username.toLowerCase() === usernameInput.trim().toLowerCase()
          );
          alert(
            '✅  LOGIN SUCCESSFUL! 🎉\n\n' +
            '━━━━━━━━━━━━━━━━━━━\n' +
            '👤  Username : ' + loggedInUser.username + '\n' +
            '🛡️   Role     : ' + loggedInUser.role + '\n' +
            '━━━━━━━━━━━━━━━━━━━\n\n' +
            'Welcome back, ' + loggedInUser.username + '!\n' +
            'You have been successfully authenticated.\n\n' +
            '✨ Redirecting to dashboard...'
          );
          // Clear the form on success
          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
          // Focus back on username for next login
          document.getElementById('username').focus();
          break;

        default:
          alert('⚠️  An unknown error occurred. Please try again.');
          break;
      }

      // Return the status so calling code can use it if needed
      return statusCode;
    }

    // =====================================================
    // 5. ATTACH FORM SUBMIT EVENT
    // =====================================================
    document.getElementById('loginForm').addEventListener('submit', function (event) {
      // Prevent the form from actually submitting / refreshing the page
      event.preventDefault();

      // Get input values
      const usernameInput = document.getElementById('username').value;
      const passwordInput = document.getElementById('password').value;

      // Run validation (switch case is inside this function)
      const resultStatus = validateLogin(usernameInput, passwordInput);

      // Optional: Log the status to console for debugging
      console.log('Login attempt status:', resultStatus);
      console.log('Username entered:', usernameInput || '(empty)');
    });

    // =====================================================
    // 6. FOCUS ON USERNAME FIELD ON PAGE LOAD
    // =====================================================
    document.getElementById('username').focus();

    // =====================================================
    // 7. BONUS: REGENERATE PYRAMID ON CLICK (FUN FEATURE)
    // =====================================================
    pyramidDisplay.addEventListener('click', function () {
      // Cycle between different pyramid sizes: 7, 9, 11, 13, then back to 7
      const sizes = [7, 9, 11, 13, 15];
      const currentText = pyramidDisplay.textContent;
      const currentRows = currentText.split('\n').length;
      let currentIndex = sizes.indexOf(currentRows);
      if (currentIndex === -1 || currentIndex >= sizes.length - 1) {
        currentIndex = -1;
      }
      const newSize = sizes[currentIndex + 1];
      pyramidDisplay.textContent = generatePyramid(newSize);

      // Brief pulse animation effect
      pyramidDisplay.style.transition = 'transform 0.2s ease';
      pyramidDisplay.style.transform = 'scale(1.06)';
      setTimeout(() => {
        pyramidDisplay.style.transform = 'scale(1)';
      }, 200);
    });

    // Add cursor pointer hint on pyramid
    pyramidDisplay.style.cursor = 'pointer';
    pyramidDisplay.title = 'Click to change pyramid size';

    console.log('🚀 Star Portal Login Page Ready');
    console.log('👤 Demo Credentials:');
    console.log('   admin / admin123');
    console.log('   user  / user123');
    console.log('   guest / guest123');
    console.log('✨ Click the star pyramid to resize it!');