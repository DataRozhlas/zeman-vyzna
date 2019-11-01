#%%
import pandas as pd
import json
import os
import unidecode

#%%
d = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQOXTTWSjRe5OlcMTGB6KEPnwV6ZJ6GLvXhBir4j4P07Y5z3YKbnFJJ8HdRkxh_dS0884RnndO-6L6F/pub?gid=0&single=true&output=csv')

#%%
d.columns

#%%
d.fillna('', inplace=True)

#%%
present = list(os.listdir('./foto'))

#%%
d[['j', 'p']] = d[['j', 'p']].applymap(lambda x: x.lower().capitalize())
d.drop(columns=['f', 'editor'], inplace=True)
d['f'] = d.p.apply(lambda x: unidecode.unidecode(x.split(' ')[-1].lower()) + '.jpg')
d['f'] = d.f.apply(lambda x: x if x in present else 'face.jpg')

#%%
with open('./data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(list(d.to_dict(orient='index').values()),  ensure_ascii=False))


#%%
