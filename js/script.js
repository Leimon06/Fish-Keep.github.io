document.querySelectorAll('a[href^="#bottom-section"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


function showPopUpImage1() {
  var popup = document.getElementById("popupImage1");
  popup.style.display = "block";
}

function hidePopUpImage1() {
  var popup = document.getElementById("popupImage1");
  popup.style.display = "none";
}

function showPopUpImage2() {
  var popup = document.getElementById("popupImage2");
  popup.style.display = "block";
}

function hidePopUpImage2() {
  var popup = document.getElementById("popupImage2");
  popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  // Select the "Post Suggestion/Question" section
  const postSuggestionSection = document.querySelector('.topics');

  // Select all posts
  const posts = document.querySelectorAll('.posted');

  // Convert NodeList to array for easier manipulation
  const postsArray = Array.from(posts);

  // Sort posts based on the number of likes (descending order)
  postsArray.sort(function (a, b) {
    const likeCountA = parseInt(a.querySelector('.post-rating-count').textContent);
    const likeCountB = parseInt(b.querySelector('.post-rating-count').textContent);
    return likeCountB - likeCountA;
  });

  // Find the index of the "Post Suggestion/Question" section
  const index = postsArray.findIndex(post => post.contains(postSuggestionSection));

  // Insert the highest liked post just before the "Post Suggestion/Question" section
  if (index !== -1 && index < postsArray.length - 1) {
    const highestLikedPost = postsArray[index];
    const nextSibling = postSuggestionSection.nextSibling;
    highestLikedPost.parentNode.insertBefore(highestLikedPost, nextSibling);
  }
});

function postComment() {
  // Get the comment text from the textarea
  var commentText = document.getElementById('comment-text').value;

  // Check if the comment is not empty
  if (commentText.trim() !== '') {
    // Create a new comment element
    var newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.textContent = commentText;

    // Append the new comment to the comments container
    document.getElementById('comments-container').appendChild(newComment);

    // Clear the textarea
    document.getElementById('comment-text').value = '';
  }
}

function createpost() {
  // Get the post content from the textarea
  var postContent = document.querySelector('.post-form textarea').value;

  // Check if the post content is not empty
  if (postContent.trim() !== '') {
    // Generate a unique identifier for the post
    var postId = 'post-' + Date.now();

    // Create a new post element
    var newPost = document.createElement('div');
    newPost.className = 'posted';
    newPost.id = postId; // Set the unique identifier for the post

    var newPostHTML = `
          <h4>Anonymous</h4>
          <div class="info">
              <span>• Just now</span>
          </div>
          <p>${postContent}</p>
          <div class="post-ratings-container">
              <div class="post-rating">
                  <span class="post-rating-button material-icons like-button">thumb_up</span>
                  <span class="post-rating-count">0</span>
              </div>
              <div class="post-rating">
                  <span class="post-rating-button material-icons dislike-button">thumb_down</span>
                  <span class="post-rating-count">0</span>
              </div>
          </div>


          
          
          <div id="comments-container-${postId}"> <!-- Unique ID for comments container -->
              <!-- Existing comments will be displayed here -->
          </div>

          

          <!-- Inside the newPostHTML variable -->
          <div id="view-more-comments-${postId}" class="view-more-comments" style="display: none;">
            <button onclick="toggleCommentsVisibility('${postId}')">View More Comments</button>
          </div>

          <div id="comment-form-${postId}"> <!-- Unique ID for comment form -->
              <textarea id="comment-text-${postId}" placeholder="Type your comment..."></textarea>
              <button onclick="postComment('${postId}')">Post Comment</button>
          </div>
          
      `;

    newPost.innerHTML = newPostHTML;

    // Find the first post box
    var firstPost = document.querySelector('.posted');

    // Insert the new post after the first post box
    firstPost.parentNode.insertBefore(newPost, firstPost.nextSibling);

    // Clear the textarea
    document.querySelector('.post-form textarea').value = '';

    // Add event listeners for like and dislike buttons
    newPost.querySelector('.like-button').addEventListener('click', function () {
      var likeCount = newPost.querySelector('.post-rating-count');
      var dislikeButton = newPost.querySelector('.dislike-button');

      if (this.classList.contains('post-rating-selected')) {
        // Button was already liked, so decrease count and remove selection
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        this.classList.remove('post-rating-selected');
        this.style.color = ''; // Remove color highlight
      } else {
        // Button was not liked, so increase count and add selection
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        this.classList.add('post-rating-selected');
        this.style.color = '#cb3401'; // Highlight in orange

        // If dislike button is already selected, remove its selection
        if (dislikeButton.classList.contains('post-rating-selected')) {
          var dislikeCount = newPost.querySelectorAll('.post-rating-count')[1];
          dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
          dislikeButton.classList.remove('post-rating-selected');
          dislikeButton.style.color = ''; // Remove color highlight
        }
      }
    });

    newPost.querySelector('.dislike-button').addEventListener('click', function () {
      var dislikeCount = newPost.querySelectorAll('.post-rating-count')[1];
      var likeButton = newPost.querySelector('.like-button');

      if (this.classList.contains('post-rating-selected')) {
        // Button was already disliked, so decrease count and remove selection
        dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
        this.classList.remove('post-rating-selected');
        this.style.color = ''; // Remove color highlight
      } else {
        // Button was not disliked, so increase count and add selection
        dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
        this.classList.add('post-rating-selected');
        this.style.color = '#cb3401'; // Highlight in orange

        // If like button is already selected, remove its selection
        if (likeButton.classList.contains('post-rating-selected')) {
          var likeCount = newPost.querySelector('.post-rating-count');
          likeCount.textContent = parseInt(likeCount.textContent) - 1;
          likeButton.classList.remove('post-rating-selected');
          likeButton.style.color = ''; // Remove color highlight
        }
      }
    });
  }
}




function postComment(postId) {
  // Get the comment text from the textarea
  var commentText = document.getElementById(`comment-text-${postId}`).value;

  // Check if the comment is not empty
  if (commentText.trim() !== '') {
    // Create a new comment element
    var newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.textContent = commentText;

    // Get the comments container of the specific post
    var commentsContainer = document.getElementById(`comments-container-${postId}`);

    // Insert the new comment at the top of the comments container
    commentsContainer.insertBefore(newComment, commentsContainer.firstChild);

    // Show "View More Comments" button if there are more than four comments
    if (commentsContainer.children.length > 4) {
      var viewMoreButton = document.getElementById(`view-more-comments-${postId}`);
      viewMoreButton.style.display = 'block';
    }

    // Hide older comments if there are more than four comments
    if (commentsContainer.children.length > 4 && !commentsContainer.classList.contains('show-all-comments')) {
      hideOlderComments(commentsContainer);
    }

    // Clear the textarea
    document.getElementById(`comment-text-${postId}`).value = '';
  }
}

function hideOlderComments(container) {
  var comments = container.children;
  for (var i = 4; i < comments.length; i++) {
    comments[i].style.display = 'none';
  }
}

function toggleCommentsVisibility(postId) {
  var commentsContainer = document.getElementById(`comments-container-${postId}`);
  var viewMoreButton = document.getElementById(`view-more-comments-${postId}`);

  if (commentsContainer.classList.contains('show-all-comments')) {
    // Hide older comments
    hideOlderComments(commentsContainer);
    commentsContainer.classList.remove('show-all-comments');
    viewMoreButton.textContent = 'View More Comments';
  } else {
    // Show all comments
    var comments = commentsContainer.children;
    for (var i = 4; i < comments.length; i++) {
      comments[i].style.display = 'block';
    }
    commentsContainer.classList.add('show-all-comments');
    viewMoreButton.textContent = 'Hide Older Comments';
  }
}

function hideOlderComments(container) {
  var comments = container.children;
  for (var i = 4; i < comments.length; i++) {
    comments[i].style.display = 'none';
  }
}















    const fishNames = ["Betta", "Goldfish", "Molly", "Neon Tetra", "Platy", "Guppy", "Danios", "Angelfish", "Barb"];

    // Function to filter fish names based on input
    function filterFishNames(input) {
      return fishNames.filter(name => name.toLowerCase().includes(input.toLowerCase()));
    }
    
    // Function to update autocomplete suggestions
    function updateAutocompleteSuggestions(input) {
      const autocompleteContainer = document.getElementById('autocompleteContainer');
      autocompleteContainer.innerHTML = ''; // Clear previous suggestions
    
      if (input.trim() !== '') { // Check if input is not empty
        const filteredFishNames = filterFishNames(input);
        filteredFishNames.forEach(name => {
          const suggestion = document.createElement('div');
          suggestion.textContent = name;
          suggestion.classList.add('autocomplete-item');
    
          // Add click event listener to fill input field with clicked suggestion and navigate to the corresponding page
          suggestion.addEventListener('click', function () {
            const fishLink = fishPages[name.toLowerCase()];
            if (fishLink) {
              window.location.href = fishLink;
            }
          });
    
          autocompleteContainer.appendChild(suggestion);
        });
      }
    }
    
    // Function to handle input in search box
    document.getElementById('searchInput').addEventListener('input', function () {
      const input = this.value;
      updateAutocompleteSuggestions(input);
    });
    
    // Array of fish names with corresponding page URLs
    const fishPages = {
      "betta": "Sub/Betta.html",
      "goldfish": "Sub/Goldfish.html",
      "molly": "Sub/Molly.html",
      "neon tetra": "Sub/Neon Tetra.html",
      "platy": "Sub/Platy.html",
      "guppy": "Sub/Guppy.html",
      "danios": "Sub/Danios.html",
      "angelfish": "Sub/Angelfish.html",
      "barb": "Sub/Barb.html"
    };
    
    // Function to handle search when Enter key is pressed
    document.getElementById('searchInput').addEventListener('keypress', function (event) {
      if (event.keyCode === 13) { // Check if Enter key is pressed
        const enteredFishName = this.value.trim().toLowerCase(); // Convert to lowercase
        console.log("Entered Fish Name:", enteredFishName); // Debug statement
    
        if (fishPages.hasOwnProperty(enteredFishName)) {
          const fishLink = fishPages[enteredFishName];
          window.location.href = fishLink;
        } else {
          alert("Sorry, we couldn't find information for the entered fish.");
        }
      }
    });