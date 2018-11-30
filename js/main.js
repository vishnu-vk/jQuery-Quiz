var quiztitle = "jQuery Quiz";
 var quiz = [
        {
            "question" : "Q1: Which of the following is correct?",
            "choices" : [
                                    "jQuery is a JSON Library",
                                    "jQuery is a JavaScript Library",
                                    "jQuery is a server side scripting language",
                                    "jQuery is a JAVA Library"
                                ],
            "correct" : "jQuery is a JavaScript Library",
            "qtype":"mcq",
            "explanation" : "jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, animation, and Ajax",
        },
        {
            "question" : "Q2: What is the correct jQuery code to set the background color of all p elements to red?",
            "choices" : [
                                    '$("p").layout("background-color","red"); ',
                                    '$("p").style("background-color","red");',
                                    '$("p").css("background-color","red");',
                                    '$("p").manipulate("background-color","red");'
                                ],
            "correct" : '$("p").css("background-color","red");',
            "qtype":"mcq",
            "explanation" : "css method is used to select th styling of a element ",
        },
        {
            "question" : "Q3: jQuery uses CSS selectors to select elements?",
            
            "choices" : [
                                    "True",
                                    "False",
                                    
                                ],
            "correct" : "True",
            "qtype":"trueorfalse",
            "explanation" : "css method is used to select th styling of a element ",
        },
        {
            "question":"Q4: jQuery is a client side scripting",
            "choices":[
                        "True",
                        "False"
                        ],
            "correct":"True",
            "qtype":"trueorfalse",
            "explanation":"jQuery is just a library for JavaScript. That's all clientside",
        },
        {
            "question":"Q5: jQuery is a Library of _______",
            "qtype":"fillintheblanks",
            "correct":"javascript",
            "explanation":"jQuery is just a library for JavaScript",
        },
        {
            "question":"Q6: _______ method is used to manipulate styles",
            "qtype":"fillintheblanks",
            "correct":"css()",
            "explanation":" The css() method sets or returns one or more style properties for the selected elements",
        },
     

    ];


 var currentquestion = 0,
     score = 0,
     submt = true,
     picked,
     reviewed_array=[],
     entered_answers=[],
     corr_answer=[],
     locked_array=[];
     var ln=quiz.length,i;
     for(i=0;i<ln;i++)
     {
         reviewed_array.push(0);
     }
     for(i=0;i<ln;i++)
     {
         locked_array.push(0);
     }
     for(i=0;i<ln;i++)
     {
         corr_answer.push(0);
     }
     for(i=0;i<ln;i++)
     {
         entered_answers.push('');
     }
 jQuery(document).ready(function ($) {


     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }


     function addChoices(choices) {
         if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
             }
         }
         else{
             $('#choice-block').empty();
             $(document.createElement('input')).attr('type','text').addClass("choice-box input-field").appendTo('#choice-block');
         }
     }

     function nextQuestion() {
         submt = true;
         //alert(currentquestion);
         $('#question').text(quiz[currentquestion]['question']);
         $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
             if ($('#question-image').length == 0) {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
             } else {
                 $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
             }
         } else {
             $('#question-image').remove();
         }
         addChoices(quiz[currentquestion]['choices']);
         if(reviewed_array[currentquestion]==1 || entered_answers[currentquestion]!='' || locked_array[currentquestion]==1){
         $('#next').css('display','block');
         $('#prev').css('display','block');
         
         }
         else
         {
            
            $('#next').css('display','none');
            $('#prev').css('display','none');
         }
         if(locked_array[currentquestion]!=1)
         {
             $('ul').css('pointer-events','all');
             $('#review').css('display','block');
             $('#explanation').empty();
         }
         else
         {
             $('ul').css('pointer-events','none');
            $('#explanation').html(htmlEncode(quiz[currentquestion]['explanation']));
         }

         if(entered_answers[currentquestion]!='')
         {
             $("li[data-index='"+entered_answers[currentquestion]+"']").css({
                'border-color': '#222',
                'font-weight': 700,
                'background-color': '#c1c1c1'
            });
         }


         setupButtons();


     }


     function processQuestion() {
         var i=0;
         for(;i<quiz.length;i++)
         {
             if(quiz[i]['qtype']=='fillintheblanks')
             {
                 
                if(quiz[i]['correct']==entered_answers[i])
                {
                    score++;
                    corr_answer[i]=1;
                    alert("1");
                }
             }
             else{
                 if(quiz[i]['choices'][entered_answers[i]]==quiz[i]['correct'])
                {
                 score++;
                 corr_answer[i]=1;
                 alert("2");
                }
            }
         }
         
     }


     function setupButtons() {
         $('.choice').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.choice').on('mouseout', function () {
             $(this).css({
                 'background-color': 'rgb(237, 143, 22)'
             });
         })
         $('.choice').on('click', function () {
             entered_answers[currentquestion] = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 700,
                 'background-color': '#c1c1c1'
             });
             $('#next').css('display','block');
             $('#prev').css('display','block');
             
         })
         $('.input-field').on("change paste keyup",function(){
             if($(this).val()!=''){
            entered_answers[currentquestion]=$(this).val();
             $('#next').css('display','block');
             $('#prev').css('display','block');
             }

         })
     }

    

     function endQuiz() {
         $('#explanation').empty();
         $('#question').empty();
         $('#choice-block').empty();
         $('#submitbutton').remove();
         processQuestion();
         $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
         $(document.createElement('h2')).css({
             'text-align': 'center',
             'font-size': '4em'
         }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
         alert(corr_answer);
         var i;
         for(i=0;i<quiz.length;i++)
         {
             if(corr_answer[i]===1)
             {
                 $(document.createElement('li')).addClass('questions_ans').attr('data-index', i).text("Question "+(i+1)+" is True").appendTo('#explanation');
             }
             else
             {
                $(document.createElement('li')).addClass('questions_ans').attr('data-index', i).text("Question "+(i+1)+" is False").appendTo('#explanation');
             }
         }
     }


     function init() {
         //add title
         if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
             $(document.createElement('h1')).text(quiztitle).appendTo('.heading');
         } else {
             $(document.createElement('h1')).text("Quiz").appendTo('.heading');
         }

         //add pager and questions
         if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
             //add pager
             $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('.heading');
             //add first question
             $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
             //add image if present
             if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
             }
             $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

             //questions holder
             $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

             //add choices
             addChoices(quiz[0]['choices']);

             //add submit button
             $(document.createElement('div')).addClass('choice-box').attr('id',  'review').html('REVIEW QUESTION').on('click', function () {
               reviewed_array[currentquestion]=1;
               $('#next').css('display','block');
               $('#prev').css('display','block');
                
            }).appendTo('#buttons_con');
            $(document.createElement('div')).addClass('choice-box').attr('id',  'show_answer').html('SHOW ANSWER').on('click', function () {
                locked_array[currentquestion]=1;
                entered_answers[currentquestion]='';
                $('#explanation').html(htmlEncode(quiz[currentquestion]['explanation']));
                $('ul').css('pointer-events','none');
                $('#review').css('display','none');
                $('#next').css('display','block');
                $('#prev').css('display','block');
                 
             }).appendTo('#buttons_con');
            $(document.createElement('div')).addClass('choice-box').attr('id',  'next').html('NEXT QUESTION >>').on('click', function () {
                if (currentquestion == quiz.length-1) {
                    endQuiz();
                } else {
                    currentquestion++;
                    nextQuestion();
                }
            }).appendTo('#buttons_con');
            $(document.createElement('div')).addClass('choice-box').attr('id',  'prev').html('<< PREVIOUS QUESTION').on('click', function () {
                if (currentquestion == 0) {
                   // $(this).css('background','#ccc');
                } else {
                    currentquestion--;
                    nextQuestion();
                }
            }).appendTo('#buttons_con');

            $(document.createElement('div')).addClass('choice-box').attr('id',  'quit').html('END QUIZ').on('click', function () {
                endQuiz();
            }).appendTo('#buttons_con');
            $(document.createElement('div')).addClass('choice-box').attr('id',  'start_over').html('RESTART').on('click', function () {
                location.reload();
            }).appendTo('#buttons_con');
            
            $('#next').css('display','none');
            $('#prev').css('display','none');

             setupButtons();
         }
     }

     init();
 });