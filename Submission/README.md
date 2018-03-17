**This is INFO-5602's project 2 by Team 1**
<br></br>Team member:  Keke Wu, Wei Miao, Xu Han, Yawen Zhang, Jiawei Liu


**Brief description of our project(What):**
<br></br>
This project explores the National Center for Women in Technology(NCWIT) dataset. All of our four visualizations focus on comparisons between female and male from different aspects: time, enrollment number, graduated number, drop-out(left institution) number, major declaration time and race distribution.
<br></br>

**Brief description of Visualization 1:**
<br></br>
* What does it show: The Ratio of Female to Male in Enrollment, Graduated and Dropout Count with Years
* Interactions part: 
     * Checkbox showing ratio in Enrollment and/or Graduated and/or Dropout count; 
     * Mouseover showing hoverline over different years with Ratio values
* Conclusions: 
     * The ratio of female/male in Enrollment and Graduated are higher than Dropout, indicating less female per male dropout during school years. 
     * The enrollment ratio gradually incresed indicates that more and more female enrolled in CS-related major.


**Brief description of Visualization 2:**
<br></br>
* What does it show: The Actual Count in Enrollment, Graduated and Dropout of Female and Male with Years
* Interactions part:
     * Mouseover to get detailed data information.
     * Click on legends to filter data.
* Conclusions: The number of male is much more than female in all enrollment, graduated and dropout aspects.

<br></br>

**Brief description of Visualization 3:**
<br></br>
* What does it show: The Enrollment Count with Major Declaration Time of Female and Male
* Interactions part:  
     * Checkbox showing Male and Female charts;
     * Mouseover getting tooltips of amount and percentage;
     * Legend filtering data
* Conclusions:
     * Enrollment trend is almost the same between male and female students.
     * Enrollment count decreases as time goes by.

**Brief description of Visualization 4:**
<br></br>
* What does it show: It shows the race distribution among total students with gender and year.
* Interactions part: In this visualization, the data has three layers, the first layer is gender, the second layer is year with each gender and the third layer is race distribution with each year and gender. In this case, this pie chart can be zoomed in/out to layer.
     * Click on the pie chart to zoom in;
     * Click in the center to zoom out;
     * Mouseover getting tooltips of label and percentage;

* Conclusions:
     * Number of male students are much more than female students no matter which year
     * Number of students increased sharply after 2010 no matter which gender
     * White, asian and hispanics are top dominated races no matter which year which gender
<br></br>

**Our design process(How and Why):**
* Why:
     <br>1)We first discussed and settled down the theme of our project, which is the comparisons between female and male.</br>
     <br>2)With this theme, we brainstromed possible questions that can be explored and listed them in a worksheet. We analyzed them in terms of ways to visualize, meaningfulness, necessities and so on. Based on our analysis, we chose four questions to explore and visualize: What are the exact counts of female and male's enrollment, graduated and dropout with year? What are the ratio trends of female to male in terms of enrollment, graduated and dropout with year? How major declaration time influences enrollment? What is the race distribution? </br>
     <br></br>
* How:
     <br>1)After settled down the questions to explore, we came up with several visualization encodings for each question. We analyzed the pros and cons for each encodings and then selected the best one. For question 1 and 2, since they are related to time, we decided to use line graph and bar chart to visualize them so that readers could easily capture the trends. For question 3 and 4, since we try to convey the information of data distribution, we chose to use pie chart. The we used MS excel to prototype our visulizations to observe the data pattern.</br>
     <br>2)Based on former steps, we preprocessed our data to aggreagate and clean them with python.</br>
     <br>3)We built our framework with bootstrape and visualizations with D3.js based on prototypes.</br>
     <br>4)When designing interaction parts, we generally used mouse interaction to show detailed data information on our visualizations. We also deployed query tools to filter our data. Since there is a strong connection between question 1 and question 2, we decided to build coordinated views between them. In quesiton 4, since there is an obvious tree structure in data, we used a pie chart which could be zoomed in and out to visualize it.
    
     

     
     

<br></br>

**Our team roles:**
<br>Keke Wu: Viz3 | Styling</br>
<br>Wei Miao: Viz2 | Framework</br>
<br>Xu Han: Viz4 | Data Processing  </br>
<br>Yawen Zhang: Viz1 | Data Processing  </br>
<br>Jiawei Liu: Viz Prototype</br>


<br></br>

**How to run our project:**
<br>We used python for data processing and d3 for data visualiazation.</br>
<br>1) open terminal</br>
<br>2) navigate to the project folder</br>
<br>3) python -m SimpleHTTPServer</br>
<br>4) open http://localhost:8000 in browser
