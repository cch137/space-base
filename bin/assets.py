import os
import re

def replace_patterns(text):
    # Define the pattern to match "word (number)" format
    pattern = r'(\w+)\s*\((\d+)\)'
    
    # Define the replacement pattern
    replacement = r'\1-\2'
    
    # Use re.sub() to perform the replacement
    replaced_text = re.sub(pattern, replacement, text)
    
    return replaced_text

for dirname, dirs, files in os.walk('public/assets/'):
  for file in files:
    filepath = os.path.join(dirname, file)
    new_filepath = replace_patterns(filepath)
    with open(filepath, 'r', encoding='utf-8') as rf:
      svg = rf.read()
      if 'style=' not in svg:
        with open(filepath, 'w', encoding='utf-8') as wf:
          wf.write(svg.replace(' xmlns:xlink="http://www.w3.org/1999/xlink"', ' xmlns:xlink="http://www.w3.org/1999/xlink" style="fill:#fff"'))
    os.rename(filepath, new_filepath)