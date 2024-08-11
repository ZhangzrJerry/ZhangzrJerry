var int = self.setInterval("clock()", 1000);

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
    window.location.replace('#' + url);
}

function render() {
    // fetch data from json file
    var name = ["practice", "robotics"];
    fetch("../data/projects.json").then(response => response.json()).then(data => {
        // sort the data by time
        let overview = [];
        for (let i = 0; i < name.length; i++) {
            overview.push(...data[name[i]]);
        }
        overview.sort((a, b) => { return b.time - a.time });

        // fullfill the grid with cards
        let element = document.getElementById('overview-grid');
        element.innerHTML = '';
        for (let i = 0; i < overview.length; i++) {
            console.log(overview[i]);
            element.innerHTML += `
                <div class="card">
                    <div class="card-image">
                        <img src=${overview[i].image} class="card-image">
                    </div>
                    <div class="category">
                    ${overview[i].brief}
                    </div>
                    <div class="heading">
                        ${overview[i].heading}
                        <div class="sign">
                            <div class="author">
                                ${overview[i].prefix}
                                <span class="name">
                                    ${overview[i].author}
                                </span>
                            </div>
                            <div class="date">
                                ${overview[i].date}
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <p class="description">
                        ${overview[i].introduction}
                        </p>
                        <button class="view" onclick="jump('${overview[i].heading}')">
                        view>>>
                        </button>
                    </div>
                </div>
            `;
        }

        // fullfill the content with details
        element = document.getElementById('projects-content');
        for (let i = 0; i < name.length; i++) {
            element.innerHTML += `
                <h3>1</h3>
            `;
        }
        element.innerHTML = element.value.replace("<h3>", "### ").replace("</h3>", "");
    });
}