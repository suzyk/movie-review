import '../styles/main.css';

const url = new URL(location.href);
//const movieId = url.searchParams.get("id");
const movieId = url.pathname.split('/').pop();  // Extract movie ID
const movieTitle = url.searchParams.get("title");
const APILINK = '/api/v1/reviews';

const reviewContainer = document.querySelector('.reviews');
const title = document.querySelector('#review_movie_title');
const brandLogoImage = document.querySelector('#brand_logo_img');
/*const save_btn = document.querySelector('.save-review-btn');
const edit_btn = document.querySelector('.edit-review-btn');
const delete_btn = document.querySelector('.delete-review-btn');
*/
title.innerText = movieTitle;
brandLogoImage.addEventListener('click', (e) => {
    location.href = '/';
});

//save_btn.addEventListener('click', saveReview('new_review', 'new_user'));
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('save-review-btn')){
        const reviewBlock = e.target.closest('.review');
        const reviewInput = reviewBlock.querySelector('.review-input');
        const userInput = reviewBlock.querySelector('.user-input');
        if (reviewBlock.hasAttribute('id')){// saving edited review
            console.log('has id');
            saveReview(reviewInput.value, userInput.value, reviewBlock.getAttribute('id'));
        }else{  // saving new review
            console.log('has no id');
            saveReview(reviewInput.value, userInput.value);
        }
    }else if(e.target.classList.contains('edit-review-btn')){
        const reviewBlock = e.target.closest('.review');
        const review = reviewBlock.querySelector('.review-content');
        const user = reviewBlock.querySelector('.user-content');
        console.log(review, "  ", user);
        editReview(reviewBlock.getAttribute('id'), user.innerText, review.innerText);
    }else if(e.target.classList.contains('delete-review-btn')){
        const reviewBlock = e.target.closest('.review');
        deleteReview(reviewBlock.getAttribute('id'));
    }
});
//edit_btn.addEventListener('click', editReview(${review._id}', '${review.user}', '${review.review}');
const reviewCard = document.createElement('div');

reviewCard.setAttribute('class', 'review');
reviewCard.innerHTML = `
        <h3 class='new_review_title'>New Review</h3>
      <p><strong>Review: </strong>
            <input type="text" class="review-input" value="">
      </p>
      <p><strong>User: </strong>
            <input type="text" class="user-input" value="">
      </p>
      <p><button class="save-review-btn">💾</button></p>
`;// <a href="#" class="save-review-btn">💾</a>

reviewContainer.appendChild(reviewCard);

  
//default function of fetch is GET request
fetch(APILINK + "/movie/" + movieId)
        .then(response => response.json())
        .then(response => returnReviews(response))
        .catch(err => console.error(err));


function returnReviews(reviews) {
    reviews.forEach(review => {
      const reviewCard = document.createElement('div');

      reviewCard.setAttribute('class', 'review');
      reviewCard.setAttribute('id', `${review._id}`);
      reviewCard.innerHTML = `
            <label><strong>Review: </strong></label><p class="review-content">${review.review}</p>
            <label><strong>User: </strong></label><p class="user-content">${review.user}</p>
            <p><button class="edit-review-btn">✏️</button></p>
            <p><button class="delete-review-btn">🗑️</button></p>
      `;
      //editReview(${review._id}', '${review.user}', '${review.review}')
        //deleteReview('${review._id}')
      reviewContainer.appendChild(reviewCard);
    });
    
}

function editReview(id, user, review) {
    //console.log(review);
    const reviewBlock = document.getElementById(id);

    reviewBlock.innerHTML = `
    <p><strong>Review: </strong>
        <input type="text" class="review-input" value="${review}"
    </p>
    <p><strong>User: </strong>
        <input type="text" class="user-input" value="${user}"
    </p>
    <p><button class="save-review-btn">💾</button></p>
    
`;//onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')"
}

function saveReview(review, user, reviewId=""){
    
    if(reviewId){ // if it has default value(empty string), this will be false

        fetch(APILINK + "/" + reviewId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"user":user, "review": review})
            })
            .then(response => response.json()) //after we get the data
            .then(response => {
                //console.log(response)
                location.reload();  //reload the url
            })
            .catch(err => console.error(err));
    }else{
        fetch(APILINK + "/new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user":user, "review": review, "movieId": movieId})
        })
        .then(response => response.json()) //after we get the data
        .then(response => {
            //console.log(response)
            location.reload();  //reload the url
        })
        .catch(err => console.error(err));
    }
}

function deleteReview(reviewId) {
    //console.log(review);
    fetch(APILINK + "/" + reviewId, {
        method: 'DELETE'
    })
    .then(response => response.json()) //after we get the data
    .then(response => {
        //console.log(response)
        location.reload();  //reload the url
    })
    .catch(err => console.error(err));

}