# csv file preprocessing

import pandas as pd
import math

NCWIT_Data = pd.read_csv("data/NCWIT_DataV2_RawData.csv")
# print(NCWIT_Data)

# compute Total Enrollment
NCWIT_Data['Totals, Female: Enrollment'] = NCWIT_Data['Totals, Female: Enrolled in DIFFERENT MAJOR (Tot. F)'] + NCWIT_Data['Totals, Female: Enrolled in SAME MAJOR (Tot. F)']
NCWIT_Data['Totals, Male: Enrollment'] = NCWIT_Data['Totals, Male: Enrolled in DIFFERENT MAJOR (Tot. M)'] + NCWIT_Data['Totals, Male: Enrolled in SAME MAJOR (Tot. M)']

# VISUALIZATION 1
# attributes
vis_1_Female_attr = ["Totals, Female: Graduated (Tot. F)", "Totals, Female: Left Institution (not graduated) (Tot. F)", "Totals, Female: Enrollment"]
# export
vis_1_Female = NCWIT_Data.groupby("School Year")[vis_1_Female_attr].sum()
# compute rate (%)
vis_1_Female['Female Graduated Rate (%)'] = vis_1_Female.apply(lambda row: row[0]/row[2]*100, axis = 1)
vis_1_Female['Female Dropout Rate (%)'] = vis_1_Female.apply(lambda row: row[1]/row[2]*100, axis = 1)
# print(vis_1_Female)

# attributes
vis_1_Male_attr = ["Totals, Male: Graduated (Tot. M)", "Totals, Male: Left Institution (not graduated) (Tot. M)", "Totals, Male: Enrollment"]
# export
vis_1_Male = NCWIT_Data.groupby("School Year")[vis_1_Male_attr].sum()
# compute rate (%)
vis_1_Male['Male Graduated Rate (%)'] = vis_1_Male.apply(lambda row: row[0]/row[2]*100, axis = 1)
vis_1_Male['Male Dropout Rate (%)'] = vis_1_Male.apply(lambda row: row[1]/row[2]*100, axis = 1)

# combine Female & Male
vis_1 = pd.concat([vis_1_Female, vis_1_Male], axis = 1)
vis_1 = vis_1.dropna() # remove 2016-2017 NaN
vis_1.to_csv("data/vis_1_Graduate_Dropout_rate_Year.csv")
