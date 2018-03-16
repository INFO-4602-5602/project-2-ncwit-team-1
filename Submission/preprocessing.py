# csv file preprocessing

import pandas as pd
import math

NCWIT_Data = pd.read_csv("data/raw/NCWIT_DataV2_RawData.csv")
# print(NCWIT_Data)

# compute Total Enrollment
NCWIT_Data['Totals, Female: Enrollment'] = NCWIT_Data['Totals, Female: Enrolled in DIFFERENT MAJOR (Tot. F)'] + NCWIT_Data['Totals, Female: Enrolled in SAME MAJOR (Tot. F)']
NCWIT_Data['Totals, Male: Enrollment'] = NCWIT_Data['Totals, Male: Enrolled in DIFFERENT MAJOR (Tot. M)'] + NCWIT_Data['Totals, Male: Enrolled in SAME MAJOR (Tot. M)']

def vis_1():

    # VISUALIZATION 1
    # attributes
    vis_1_Female_attr = ["Totals, Female: Graduated (Tot. F)", "Totals, Female: Left Institution (not graduated) (Tot. F)", "Totals, Female: Enrollment"]
    # export
    vis_1_Female = NCWIT_Data.groupby("School Year")[vis_1_Female_attr].sum()
    # compute rate (%)
    vis_1_Female['Female Enrollment Rate (%)'] = vis_1_Female.apply(lambda row: row[2]/(row[0]+row[1]+row[2])*100, axis = 1)
    vis_1_Female['Female Graduated Rate (%)'] = vis_1_Female.apply(lambda row: row[0]/(row[0]+row[1]+row[2])*100, axis = 1)
    vis_1_Female['Female Dropout Rate (%)'] = vis_1_Female.apply(lambda row: row[1]/(row[0]+row[1]+row[2])*100, axis = 1)
    # print(vis_1_Female)

    # attributes
    vis_1_Male_attr = ["Totals, Male: Graduated (Tot. M)", "Totals, Male: Left Institution (not graduated) (Tot. M)", "Totals, Male: Enrollment"]
    # export
    vis_1_Male = NCWIT_Data.groupby("School Year")[vis_1_Male_attr].sum()
    # compute rate (%)
    vis_1_Male['Male Enrollment Rate (%)'] = vis_1_Male.apply(lambda row: row[2]/(row[0]+row[1]+row[2])*100, axis = 1)
    vis_1_Male['Male Graduated Rate (%)'] = vis_1_Male.apply(lambda row: row[0]/(row[0]+row[1]+row[2])*100, axis = 1)
    vis_1_Male['Male Dropout Rate (%)'] = vis_1_Male.apply(lambda row: row[1]/(row[0]+row[1]+row[2])*100, axis = 1)

    # combine Female & Male
    vis_1 = pd.concat([vis_1_Female, vis_1_Male], axis = 1)
    vis_1 = vis_1.dropna() # remove 2016-2017 NaN
    vis_1.to_csv("data/vis_1_2_Graduate_Dropout_rate_Year.csv")

def vis_2():

    # VISUALIZATION 2
    # see Total Enrollment, Graduated, Dropout in vis_1
    return True

def vis_3():

    # VISUALIZATION 3
    # attributes
    vis_3_Female_attr = ["Totals, Female: Graduated (Tot. F)", "Totals, Female: Left Institution (not graduated) (Tot. F)", "Totals, Female: Enrollment"]
    # export
    vis_3_Female = NCWIT_Data.groupby("When do students typically declare their major?")[vis_3_Female_attr].sum()
    # compute rate (%)
    vis_3_Female['Female Dropout Rate (%)'] = vis_3_Female.apply(lambda row: row[1]/(row[0]+row[1]+row[2])*100, axis = 1)

    # attributes
    vis_3_Male_attr = ["Totals, Male: Graduated (Tot. M)", "Totals, Male: Left Institution (not graduated) (Tot. M)", "Totals, Male: Enrollment"]
    # export
    vis_3_Male = NCWIT_Data.groupby("When do students typically declare their major?")[vis_3_Male_attr].sum()
    # compute rate (%)
    vis_3_Male['Male Dropout Rate (%)'] = vis_3_Male.apply(lambda row: row[1]/(row[0]+row[1]+row[2])*100, axis = 1)

    # combine Female & Male
    vis_3 = pd.concat([vis_3_Female, vis_3_Male], axis = 1)
    vis_3 = vis_3.dropna() # remove NaN
    vis_3.to_csv("data/vis_3_Dropout_rate_Declare_Major.csv")

def vis_4():

    # VISUALIZATION 4
    # attributes
    vis_4_Female_attr = ["Totals, Female: Asian (Tot. F)", "Totals, Female: Black/African American (Tot. F)", "Totals, Female: Hispanics of any race (Tot. F)", "Totals, Female: American Indian/Alaska Native (Tot. F)", "Totals, Female: Native Hawaiian/Other Pacific Islander (Tot. F)", "Totals, Female: White (Tot. F)"]
    # export
    vis_4_Female = NCWIT_Data.groupby("School Year")[vis_4_Female_attr].sum()
    #vis_4_Female = vis_4_Female.apply(lambda x: 100 * x / float(x.sum()), axis = 1)

    # attributes
    vis_4_Male_attr = ["Totals, Male: Asian (Tot. M)", "Totals, Male: Black/African American (Tot. M)", "Totals, Male: Hispanics of any race (Tot. M)", "Totals, Male: American Indian/Alaska Native (Tot. M)", "Totals, Male: Native Hawaiian/Other Pacific Islander (Tot. M)", "Totals, Male: White (Tot. M)"]
    # export
    vis_4_Male = NCWIT_Data.groupby("School Year")[vis_4_Male_attr].sum()
    #vis_4_Male = vis_4_Male.apply(lambda x: 100 * x / float(x.sum()), axis = 1)

    # combine Female & Male
    vis_4 = pd.concat([vis_4_Female, vis_4_Male], axis = 1)
    vis_4.to_csv("data/vis_4_Race_Year.csv")

def vis_1_grade():
    
    vis_1_grade_enrolled_attr=["Freshmen, Female: Enrolled in DIFFERENT MAJOR (Fshm F)", "Freshmen, Female: Enrolled in SAME MAJOR (Fshm F)", "Freshmen, Male: Enrolled in DIFFERENT MAJOR (Fshm M)", "Freshmen, Male: Enrolled in SAME MAJOR (Fshm M)",\
    "Sophomores, Female: Enrolled in DIFFERENT MAJOR (Sph. F)", "Sophomores, Female: Enrolled in SAME MAJOR (Sph. F)", "Sophomores, Male: Enrolled in DIFFERENT MAJOR (Sph. M)", "Sophomores, Male: Enrolled in SAME MAJOR (Sph. M)",\
    "Juniors, Female: Enrolled in DIFFERENT MAJOR (Jun. F)", "Juniors, Female: Enrolled in SAME MAJOR (Jun. F)", "Juniors, Male: Enrolled in DIFFERENT MAJOR (Jun. M)", "Juniors, Male: Enrolled in SAME MAJOR (Jun. M)",\
    "Seniors, Female: Enrolled in DIFFERENT MAJOR (Sen. F)", "Seniors, Female: Enrolled in SAME MAJOR (Sen. F)", "Seniors, Male: Enrolled in DIFFERENT MAJOR (Sen. M)", "Seniors, Male: Enrolled in SAME MAJOR (Sen. M)",\
    "5th Yr Seniors, Female: Enrolled in DIFFERENT MAJOR (5 Sen F)", "5th Yr Seniors, Female: Enrolled in SAME MAJOR (5 Sen F)", "5th Yr Seniors, Male: Enrolled in DIFFERENT MAJOR (5 Sen M)", "5th Yr Seniors, Male: Enrolled in SAME MAJOR (5 Sen M)"]

    vis_1_grade_Female = NCWIT_Data.groupby("School Year")[vis_1_grade_enrolled_attr].sum()
    Freshmen_Female_Enrolled=vis_1_grade_Female["Freshmen, Female: Enrolled in DIFFERENT MAJOR (Fshm F)"]+vis_1_grade_Female["Freshmen, Female: Enrolled in SAME MAJOR (Fshm F)"]
    Freshmen_Female_Enrolled.rename("Freshmen, Female: Enrolled")
    Freshmen_Male_Enrolled=vis_1_grade_Female["Freshmen, Male: Enrolled in DIFFERENT MAJOR (Fshm M)"]+vis_1_grade_Female["Freshmen, Male: Enrolled in SAME MAJOR (Fshm M)"]
    Freshmen_Male_Enrolled.rename("Freshmen, Male: Enrolled")
    Sophomores_Female_Enrolled=vis_1_grade_Female["Sophomores, Female: Enrolled in DIFFERENT MAJOR (Sph. F)"]+vis_1_grade_Female["Sophomores, Female: Enrolled in SAME MAJOR (Sph. F)"]
    Sophomores_Female_Enrolled.rename("Sophomores, Female: Enrolled")
    Sophomores_Male_Enrolled=vis_1_grade_Female["Sophomores, Male: Enrolled in DIFFERENT MAJOR (Sph. M)"]+vis_1_grade_Female["Sophomores, Male: Enrolled in SAME MAJOR (Sph. M)"]
    Sophomores_Male_Enrolled.rename("Sophomores, Male: Enrolled")
    Juniors_Female_Enrolled=vis_1_grade_Female["Juniors, Female: Enrolled in DIFFERENT MAJOR (Jun. F)"]+vis_1_grade_Female["Juniors, Female: Enrolled in SAME MAJOR (Jun. F)"]
    Juniors_Female_Enrolled.rename("Juniors, Female: Enrolled")
    Juniors_Male_Enrolled=vis_1_grade_Female["Juniors, Male: Enrolled in DIFFERENT MAJOR (Jun. M)"]+vis_1_grade_Female["Juniors, Male: Enrolled in SAME MAJOR (Jun. M)"]
    Juniors_Male_Enrolled.rename("Juniors, Male: Enrolled")
    Seniors_Female_Enrolled=vis_1_grade_Female["Seniors, Female: Enrolled in DIFFERENT MAJOR (Sen. F)"]+vis_1_grade_Female["Seniors, Female: Enrolled in SAME MAJOR (Sen. F)"]
    Seniors_Female_Enrolled.rename("Seniors, Female: Enrolled")
    Seniors_Male_Enrolled=vis_1_grade_Female["Seniors, Male: Enrolled in DIFFERENT MAJOR (Sen. M)"]+vis_1_grade_Female["Seniors, Male: Enrolled in SAME MAJOR (Sen. M)"]
    Seniors_Male_Enrolled.rename("Seniors, Male: Enrolled")
    Yr5_Seniors_Female_Enrolled=vis_1_grade_Female["5th Yr Seniors, Female: Enrolled in DIFFERENT MAJOR (5 Sen F)"]+vis_1_grade_Female["5th Yr Seniors, Female: Enrolled in SAME MAJOR (5 Sen F)"]
    Yr5_Seniors_Female_Enrolled.rename("Yr5_Seniors, Female: Enrolled")
    Yr5_Seniors_Male_Enrolled=vis_1_grade_Female["5th Yr Seniors, Male: Enrolled in DIFFERENT MAJOR (5 Sen M)"]+vis_1_grade_Female["5th Yr Seniors, Male: Enrolled in SAME MAJOR (5 Sen M)"]
    Yr5_Seniors_Male_Enrolled.rename("Yr5_Seniors, Male: Enrolled")
    #print(vis_1_grade_Female["Freshmen, Female: Enrolled in DIFFERENT MAJOR (Fshm F)"])
    #print(vis_1_grade_Female["Freshmen, Female: Enrolled in SAME MAJOR (Fshm F)"])
    #t=pd.concat([Freshmen_Female_Enrolled,Freshmen_Male_Enrolled,Sophomores_Female_Enrolled,Sophomores_Male_Enrolled,Juniors_Female_Enrolled,Juniors_Male_Enrolled,Seniors_Female_Enrolled,Seniors_Male_Enrolled,Yr5_Seniors_Female_Enrolled,Yr5_Seniors_Male_Enrolled])
    #t.to_csv("test.csv")

    vis_1_grade_Graduated_Left_attr = ["Freshmen, Female: Graduated (Fshm F)","Freshmen, Female: Left Institution (not graduated) (Fshm F)","Freshmen, Male: Graduated (Fshm M)","Freshmen, Male: Left Institution (not graduated) (Fshm M)", "Sophomores, Female: Graduated (Sph. F)","Sophomores, Female: Left Institution (not graduated) (Sph. F)","Sophomores, Male: Graduated (Sph. M)","Sophomores, Male: Left Institution (not graduated) (Sph. M)", "Juniors, Female: Graduated (Jun. F)","Juniors, Female: Left Institution (not graduated) (Jun. F)","Juniors, Male: Graduated (Jun. M)","Juniors, Male: Left Institution (not graduated) (Jun. M)", "Seniors, Female: Graduated (Sen. F)","Seniors, Female: Left Institution (not graduated) (Sen. F)","Seniors, Male: Graduated (Sen. M)","Seniors, Male: Left Institution (not graduated) (Sen. M)", "5th Yr Seniors, Female: Graduated (5 Sen F)","5th Yr Seniors, Female: Left Institution (not graduated) (5 Sen F)","5th Yr Seniors, Male: Graduated (5 Sen M)","5th Yr Seniors, Male: Left Institution (not graduated) (5 Sen M)"]
    vis_1_grade_Graduated_Left = NCWIT_Data.groupby("School Year")[vis_1_grade_Graduated_Left_attr].sum()


if __name__ == "__main__":

    vis_4()
