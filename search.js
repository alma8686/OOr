const search = document.getElementById("search");
const button = document.getElementById("searchButton");
const result = document.getElementById("result");


const songs = [
  ["内秘心書","naihi.html"],
  ["夜にしか咲かない満月","yoru.html"],
  ["努努-ゆめゆめ-","yumeyume.html"],
  ["カゲロウ","kagerou.html"],
  ["ケムリ","kemu.html"],
  ["欲望に満ちた青年団","yokubou.html"],
  ["エトセトラ","eto.html"],

  ["恋ノアイボウ心ノクピド","koi.html"],
  ["皆無","kaimu.html"],
  ["Living Dolls","Living_Dolls.html"],
  ["Break My Strings","Break_My_Strings.html"],

  ["完全感覚Dreamer","Dreamer.html"],
  ["Yes I am","Yes_I_am.html"],
  ["じぶんROCK","ROCK.html"],
  ["Lair","Lair.html"],
  ["Wherever you are","wherever_you_are.html"],
  ["未完成交響曲","mikansei.html"],
  ["Nobody's Home","Nobody's_Home.html"],

  ["アンサイズニア","ansize.html"],
  ["NO SCARED","NO_SCARED.html"],
  ["C.h.a.o.s.m.y.t.h","Chaosmyth.html"],
  ["Re:make","Re_make.html"],
  ["Pierce","Pierce.html"],
  ["Let's take it someday","Let's_take_it_someday.html"],
  ["キミシダイ列車","kimi.html"],

  ["Ending Story??","Ending_Story.html"],
  ["ONION!","ONION.html"],
  ["The Beginning","the_beginning.html"],
  ["Clock Strike","Clock_Strike.html"],
  ["Be the light","Be_the_light.html"],
  ["Nothing Helps","Nothing_Helps.html"],
  ["All Mine","All_Mine.html"],
  ["Deeper Deeper","Deeper_Deeper.html"],
  ["69","69.html"],
  ["the same as...","the_same_as.html"],

  ["Take me to the top","Take_me_to_the_top.html"],
  ["Cry Out","Cry_out.html"],
  ["Suddenly","Suddenly.html"],
  ["Mighty Long Fall","Mighty_Long_Fall.html"],
  ["Heartache","Heartache.html"],
  ["Memories","Memories.html"],
  ["Decision","Decision.html"],
  ["Paper Planes","Paper_Planes.html"],
  ["One by One","One_by_One.html"],

  ["Bombs away","Bombs_away.html"],
  ["Taking Off","Taking_Off.html"],
  ["We are","We_are.html"],
  ["I was King","I_was_King.html"],
  ["One Way Ticket","One_Way_Ticket.html"],
  ["Start Again","Start_Again.html"],
  ["Take what you want","Take_what_you_want.html"],

  ["Stand Out Fit In","Stand_Out_Fit_In.html"],
  ["Wasted Nights","Wasted_Nights.html"],
  ["Change","Change.html"],
  ["Push Back","Push_Back.html"],

  ["Save Yourself","Save_Yourself.html"],
  ["Neon","Neon.html"],
  ["When They Turn the Lights On","When_They_Turn_the_Lights_On.html"],
  ["Let Me Let You Go","Let_Me_Let_You_Go.html"],
  ["Mad World","Mad_World.html"],
  ["Renegades","Renegades.html"],
  ["Wonder","Wonder.html"],

  ["NASTY","NASTY.html"],
  ["Dystopia","Dystopia.html"],
  ["Tropical Therapy","Tropical_Therapy.html"],
  ["Delusion:All","Delusion_All.html"],
  ["Party's Over","Party's_Over.html"],
  ["Puppets Can't Control You","Puppets_Can't_Control_You.html"],
  ["Tiny Pieces","Tiny_Pieces.html"],
  ["This Can't Be Us","This_Can't_Be_Us.html"],
  ["+Matter","+Matter.html"],
  ["C.U.R.I.O.S.I.T.Y","CURIOSITY.html"],
  ["The Pilot","The_Pilot.html"],

  ["カラス","karasu.html"],
  ["Make It Out Alive","Make_It_Out_Alive.html"],
  ["777","777.html"]
];



button.addEventListener("click", async ()=>{

    const word = search.value.trim().toLowerCase();

result.innerHTML = "";


if(word === ""){
    result.innerHTML = "検索文字を入力してください";
    return;
}


    for(const song of songs){

        const title = song[0];
        const url = song[1];


        try{

            const response = await fetch(url);
            const html = await response.text();


            const doc = new DOMParser()
            .parseFromString(html,"text/html");


            const lyrics =
            doc.querySelector(".lyrics")?.textContent || "";


            if(
              title.toLowerCase().includes(word) ||
              lyrics.toLowerCase().includes(word)
            ){

                result.innerHTML += `
                <p>
                  <a href="${url}">
                    ${title}
                  </a>
                </p>
                `;

            }

        }catch(error){

            console.log(
              "読み込み失敗:",
              url
            );

        }

    }
    if(result.innerHTML === ""){
        result.innerHTML = "見つかりませんでした";
    }
});