window.onload = function () {
    console.log('card.js loaded');

    fetch("../data/projects.json").then(response => response.json()).then(data => {
        console.log(data);
        let elements = [
            document.getElementById('div-robotics'),
            document.getElementById('div-practice'),
        ];
        let displays = [
            data.robotics,
            data.practice,
        ];
        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < displays[i].length; j++) {
                elements[i].innerHTML += `
                    <div class="card">
                        <div class="card-image">
                            <img src=${displays[i][j].image} class="card-image">
                        </div>
                        <div class="category">
                        ${displays[i][j].category}
                        </div>
                        <div class="heading">
                            ${displays[i][j].heading}
                            <div class="sign">
                                <div class="author">
                                    ${displays[i][j].prefix}
                                    <span class="name">
                                        ${displays[i][j].author}
                                    </span>
                                </div>
                                <div class="date">
                                    ${displays[i][j].date}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    });
}