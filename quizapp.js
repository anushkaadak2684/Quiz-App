const qEl = document.getElementById("question");
const oList = document.querySelector(".option-list");
const next = document.getElementById("next-btn");

let qArr = [], i = 0, score = 0;

async function getQs() {
    try {
        const res = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
        qArr = res.data.results;
        showQ();
    } catch {
    alert("Error loading quiz");
   }
}

function decode(txt) {
    const t = document.createElement("textarea");
    t.innerHTML = txt;
    return t.value;
}

function showQ() {
    let q = qArr[i];
    qEl.innerHTML = `${i + 1}. ${decode(q.question)}`;

    let opts = [...q.incorrect_answers, q.correct_answer];
    opts.sort(() => Math.random() - 0.5); 

    oList.innerHTML = "";
    opts.forEach(opt => {
    let btn = document.createElement("div");
    btn.className = "option";
    btn.innerHTML = decode(opt);
    btn.onclick = () => {
        if (decode(opt) === decode(q.correct_answer)) {
            btn.classList.add("correct");
            score++;
        } else {
        btn.classList.add("incorrect");
    }
    lockOpts();
    };
    oList.appendChild(btn);
    });
}

function lockOpts() {
    const all = document.querySelectorAll(".option");
    all.forEach(opt => {
    opt.onclick = null; 
    if (opt.innerHTML === decode(qArr[i].correct_answer)) {
        opt.classList.add("correct");
    }
    });
}


next.onclick = () => {
 i++;
 if (i < qArr.length) showQ();
 else showResult();
};

function showResult() {
 qEl.innerHTML = `Quiz Finished!<br>Your Score: ${score}/${qArr.length}`;
 oList.innerHTML = "";
 next.style.display = "none";
}

getQs();
