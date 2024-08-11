var int = self.setInterval("clock()", 500);

function clock() {
    var t = new Date().toLocaleTimeString();
    // check if the grid is empty
    if (document.getElementById('overview-grid').innerHTML.length < 2) {
        render();
        console.log(t, "rerendered");
    }
}

function jump(string) {
    url = string.toLowerCase().replace(/ /g, '-');
    console.log(new Date().toLocaleTimeString(), "jump to", url);
    window.location.replace(url);
}

function render() {
    // fetch data from json file
    var name = ["practice", "robotics"];
    fetch("../data/projects.json").then(response => response.json()).then(data => {
        // fullfill the grid with cards
        let element = document.getElementById('overview-grid');
        element.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            element.innerHTML += `
                <div class="card">
                    <div class="card-image">
                        <img src=${data[i].image} class="card-image">
                    </div>
                    <div class="category">
                    ${data[i].brief}
                    </div>
                    <div class="heading">
                        ${data[i].heading}
                        <div class="sign">
                            <div class="author">
                                ${data[i].prefix}
                                <span class="name">
                                    ${data[i].author}
                                </span>
                            </div>
                            <div class="date">
                                ${data[i].date}
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <p class="description">
                        ${data[i].introduction}
                        </p>
                        <a href=${data[i].link} class="view">
                        view>>>
                        </a>
                    </div>
                </div>
            `;
        }
    });
}