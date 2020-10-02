



function updateDots(t) 
{
    for (let e = 0; e < dots.length; e++)
        if (dots[e].id == t.id)
            for (let a in t) dots[e][a] = t[a]
}


$(document).ready(() => 
{
     const [t, e] = [99, 0], [a, o, d, n] = [525, 0, 680, 0], [l, i, s, r] = [1e3, 526, 680, 0];
     const protoCSRF = $("#cyberDiv").val(); 
     const protoTeamId = $("#teamDiv").val();

    $("#savebutton").on("click", () => {
        let t = {
            dots: JSON.stringify(dots),
            _csrf: protoCSRF
        };
        $.ajax({
            url: "",
            type: "PUT",
            data: t
        }), alert("Formation Saved!"), modified = !1
        location.reload(); 
    }),

     $("#savebuttonformation").on("click", () => {
        let t = {
            dots: JSON.stringify(dots),
            _csrf: protoCSRF, 
            team_id: protoTeamId
        };
        $.ajax({
            url: "",
            type: "PUT",
            data: t
        }), alert("Formation Saved to Team Board: Further Changes will not be added to team Board"), modified = !1
    }),


     $("#copybutton").on("click", () => {
        let t = {
                dots: JSON.stringify(dots), 
                _csrf: protoCSRF 
              },
            askForName = prompt("Enter a name for your new tactics Board", $("#formName").text());

        null != askForName && (t.name = askForName, $.post("/copyFormation", t, () => {}))
        alert("Successful Copying of the tactics Board: Return to your profile in order to start working ")
    }), 


     $("#deletebutton").on("click", () => {
        $.ajax({
            url: "",
            data: {_csrf: protoCSRF}, 
            type: "DELETE",
            success: t => {
                window.location.replace("/dashboard/formations")
            }
        })
    }), 


     $("#addPlayer1").on("click", () => {
        let l = Math.floor(Math.random() * (t - e + 1)) + e,
            i = Math.floor(Math.random() * (a - o + 1)) + o,
            s = Math.floor(Math.random() * (d - n + 1)) + n,
            r = "",
            c = Date.now(),
            h = "Assign Position";
        dots.push({
            id: c,
            x: i,
            y: s,
            player: l,
            name: h,
            team: "Team 1"
        }), addDot()
        }),




     $("#addPlayer2").on("click", () => 
     {
       let a = Math.floor(Math.random() * (t - e + 1)) + e,
            o = Math.floor(Math.random() * (l - i + 1)) + i,
            d = Math.floor(Math.random() * (s - r + 1)) + r,
            n = "",
            c = Date.now(),
            h = "Assign Position";
        dots.push({
            id: c,
            x: o,
            y: d,
            player: a,
            name: h,
            team: "Team 2"
        }), addDot()
        })

});

