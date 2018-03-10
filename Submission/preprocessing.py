# csv file preprocessing

import pandas as pd
import math

NCWIT_Data = pd.read_csv("data/NCWIT_DataV2_RawData.csv")
# print(NCWIT_Data)

# compute per School Year race distribution (Female)
# 7 data attributes used
NCWIT_Data_Female_Race_Year = NCWIT_Data.groupby("School Year")["Totals, Female: Asian (Tot. F)", "Totals, Female: Black/African American (Tot. F)", "Totals, Female: Hispanics of any race (Tot. F)", "Totals, Female: American Indian/Alaska Native (Tot. F)", "Totals, Female: Native Hawaiian/Other Pacific Islander (Tot. F)", "Totals, Female: White (Tot. F)"].sum()

NCWIT_Data_Female_Race_Year.to_csv("data/NCWIT_Data_Female_Race_Year.csv")
