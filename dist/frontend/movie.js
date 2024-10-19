const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = 'http://localhost:8000/api/v1/reviews';

const reviewContainer = document.querySelector('.reviews');
const title = document.querySelector('#title');

title.innerText = movieTitle;

const reviewCard = document.createElement('div');

reviewCard.setAttribute('class', 'review');
//reviewCard.setAttribute('id', `${review._id}`);
reviewCard.innerHTML = `
       New Review
      <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
      </p>
      <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
      </p>
      <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a></p>
`;

reviewContainer.appendChild(reviewCard);

  
//default function of fetch is GET request
fetch(APILINK + "/movie/" + movieId)
        .then(response => response.json())
        .then(response => returnReviews(response))
        .catch(err => console.error(err));


function returnReviews(reviews) {
    reviews.forEach(review => {
      const movieCard = document.createElement('div');

      movieCard.setAttribute('class', 'review');
      movieCard.setAttribute('id', `${review._id}`);
      movieCard.innerHTML = `
            <p><strong>Review: </strong>${review.review}</p>
            <p><strong>User: </strong>${review.user}</p>
            <p><a href="#" onclick="editReview('${review._id}', '${review.user}', '${review.review}')">✏️</a></p>
            <p><a href="#" onclick="deleteReview('${review._id}')">🗑️</a></p>
      `;

      reviewContainer.appendChild(movieCard);
    });
    
}

function editReview(id, user, review) {
    //console.log(review);
    const reviewBlock = document.getElementById(id);
    const reviewInputId = "review"+id;
    const userInputId = "user"+user;

    reviewBlock.innerHTML = `
    <p><strong>Review: </strong>
        <input type="text" id="${reviewInputId}" value="${review}"
    </p>
    <p><strong>User: </strong>
        <input type="text" id="${userInputId}" value="${user}"
    </p>
    <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾</a></p>
`;
}

function saveReview(reviewInputId, userInputId, reviewId=""){

    const reviewBlock = document.getElementById(reviewId);
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
    
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
                console.log(response)
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
            console.log(response)
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
        console.log(response)
        location.reload();  //reload the url
    })
    .catch(err => console.error(err));

}