# csv file preprocessing

import pandas as pd
import math

NCWIT_Data = pd.read_csv("data/NCWIT_DataV2_RawData.csv")
# print(NCWIT_Data)

# compute per School Year race distribution (Female)
# 7 data attributes used
NCWIT_Data_Female_Race_Year = NCWIT_Data.groupby("School Year")["Totals, Female: Asian (Tot. F)", "Totals, Female: Black/African American (Tot. F)", "Totals, Female: Hispanics of any race (Tot. F)", "Totals, Female: American Indian/Alaska Native (Tot. F)", "Totals, Female: Native Hawaiian/Other Pacific Islander (Tot. F)", "Totals, Female: White (Tot. F)"].sum()

NCWIT_Data_Female_Race_Year.to_csv("data/NCWIT_Data_Female_Race_Year.csv")

NCWIT_Data_Male_Race_Year = NCWIT_Data.groupby("School Year")["Totals, Male: Asian (Tot. M)", "Totals, Male: Black/African American (Tot. M)", "Totals, Male: Hispanics of any race (Tot. M)", "Totals, Male: American Indian/Alaska Native (Tot. M)", "Totals, Male: Native Hawaiian/Other Pacific Islander (Tot. M)", "Totals, Male: White (Tot. M)"].sum()

NCWIT_Data_Male_Race_Year.to_csv("data/NCWIT_Data_Male_Race_Year.csv")

#compute Female VS. Male per school year in each majors
#When comes with missing data, delete the row with all NaN and fill in the blank with "0"
NCWIT_Data_Female_Majors_Year = NCWIT_Data.groupby(["School Year","Major Program Name"])["Totals, Female: Asian (Tot. F)", "Totals, Female: Black/African American (Tot. F)", "Totals, Female: Hispanics of any race (Tot. F)", "Totals, Female: American Indian/Alaska Native (Tot. F)", "Totals, Female: Native Hawaiian/Other Pacific Islander (Tot. F)", "Totals, Female: White (Tot. F)"].sum().dropna(axis=0, how='all').fillna(0)
NCWIT_Data_Male_Majors_Year = NCWIT_Data.groupby(["School Year","Major Program Name"])["Totals, Male: Asian (Tot. M)", "Totals, Male: Black/African American (Tot. M)", "Totals, Male: Hispanics of any race (Tot. M)", "Totals, Male: American Indian/Alaska Native (Tot. M)", "Totals, Male: Native Hawaiian/Other Pacific Islander (Tot. M)", "Totals, Male: White (Tot. M)"].sum().dropna(axis=0, how='all').fillna(0)

NCWIT_Data_Female_Majors_Year.to_csv("data/NCWIT_Data_Female_Majors_Year.csv")
NCWIT_Data_Male_Majors_Year.to_csv("data/NCWIT_Data_Male_Majors_Year.csv")

#compute Female VS. Male per school year in each majors in each degrees
#When comes with missing data, delete the row with all NaN and fill in the blank with "0"
#NCWIT_Data_Female_degree_Year = NCWIT_Data.groupby(["School Year","Major Program Name"])["Freshmen, Female: Asian (Fshm F)", "Freshmen, Female: Black/African American (Fshm F)", "Freshmen, Female: Hispanics of any race (Fshm F)", "Freshmen, Female: American Indian/Alaska Native (Fshm F)", "Freshmen, Female: Native Hawaiian/Other Pacific Islander (Fshm F)", "Freshmen, Female: White (Fshm F)","Sophomores, Female: Asian (Sph. F)", "Sophomores, Female: Black/African American (Sph. F)", "Sophomores, Female: Hispanics of any race (Sph. F)", "Sophomores, Female: American Indian/Alaska Native (Sph. F)", "Sophomores, Female: Native Hawaiian/Other Pacific Islander (Sph. F)", "Sophomores, Female: White (Sph. F)","Juniors, Female: Asian (Jun. F)", "Juniors, Female: Black/African American (Jun. F)", "Juniors, Female: Hispanics of any race (Jun. F)", "Juniors, Female: American Indian/Alaska Native (Jun. F)", "Juniors, Female: Native Hawaiian/Other Pacific Islander (Jun. F)", "Juniors, Female: White (Jun. F)","Seniors, Female: Asian (Sen. F)", "Seniors, Female: Black/African American (Sen. F)", "Seniors, Female: Hispanics of any race (Sen. F)", "Seniors, Female: American Indian/Alaska Native (Sen. F)", "Seniors, Female: Native Hawaiian/Other Pacific Islander (Sen. F)", "Seniors, Female: White (Sen. F)","5th Yr Seniors, Female: Asian (5 Sen F)", "5th Yr Seniors, Female: Black/African American (5 Sen F)", "5th Yr Seniors, Female: Hispanics of any race (5 Sen F)", "5th Yr Seniors, Female: American Indian/Alaska Native (5 Sen F)", "5th Yr Seniors, Female: Native Hawaiian/Other Pacific Islander (5 Sen F)", "5th Yr Seniors, Female: White (5 Sen F)"].sum().dropna(axis=0, how='all').fillna(0)
#NCWIT_Data_Male_degree_Year = NCWIT_Data.groupby(["School Year","Major Program Name"])["Freshmen, Male: Asian (Fshm M)", "Freshmen, Male: Black/African American (Fshm M)", "Freshmen, Male: Hispanics of any race (Fshm M)", "Freshmen, Male: American Indian/Alaska Native (Fshm M)", "Freshmen, Male: Native Hawaiian/Other Pacific Islander (Fshm M)", "Freshmen, Male: White (Fshm M)","Sophomores, Male: Asian (Sph. M)", "Sophomores, Male: Black/African American (Sph. M)", "Sophomores, Male: Hispanics of any race (Sph. M)", "Sophomores, Male: American Indian/Alaska Native (Sph. M)", "Sophomores, Male: Native Hawaiian/Other Pacific Islander (Sph. M)", "Sophomores, Male: White (Sph. M)","Juniors, Male: Asian (Jun. M)", "Juniors, Male: Black/African American (Jun. M)", "Juniors, Male: Hispanics of any race (Jun. M)", "Juniors, Male: American Indian/Alaska Native (Jun. M)", "Juniors, Male: Native Hawaiian/Other Pacific Islander (Jun. M)", "Juniors, Male: White (Jun. M)","Seniors, Male: Asian (Sen. M)", "Seniors, Male: Black/African American (Sen. M)", "Seniors, Male: Hispanics of any race (Sen. M)", "Seniors, Male: American Indian/Alaska Native (Sen. M)", "Seniors, Male: Native Hawaiian/Other Pacific Islander (Sen. M)", "Seniors, Male: White (Sen. M)","5th Yr Seniors, Male: Asian (5 Sen M)", "5th Yr Seniors, Male: Black/African American (5 Sen M)", "5th Yr Seniors, Male: Hispanics of any race (5 Sen M)", "5th Yr Seniors, Male: American Indian/Alaska Native (5 Sen M)", "5th Yr Seniors, Male: Native Hawaiian/Other Pacific Islander (5 Sen M)", "5th Yr Seniors, Male: White (5 Sen M)"].sum().dropna(axis=0, how='all').fillna(0)

#NCWIT_Data_Female_degree_Year.to_csv("data/NCWIT_Data_Female_Majors_Race_Degree_Year.csv")
#NCWIT_Data_Male_degree_Year.to_csv("data/NCWIT_Data_Male_Majors_Race_Degree_Year.csv")