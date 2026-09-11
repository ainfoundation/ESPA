import os
import re

dirs_to_check = ['src/components', 'src/pages']

def replace_rounded(match):
    m_str = match.group(0)
    m_str = re.sub(r'rounded-(?:sm|md|lg|xl|2xl|3xl)', 'rounded-full', m_str)
    # Also replace raw 'rounded' if it's there
    m_str = re.sub(r'\brounded\b(?!-)', 'rounded-full', m_str)
    return m_str

# Regex to match a JSX tag opening.
# <button followed by anything until a > that is NOT inside {} or quotes.
# This is tricky in regex. Alternatively, we can just look for classNames containing rounded-* that are definitely buttons.
# Let's write a simple script that tokenizes the file roughly or uses a simpler approach:
# Replace rounded-* with rounded-full if the line contains "<button" or "<Link"
# Or just replace all rounded-* with rounded-full globally if we don't care about inputs. But inputs shouldn't be rounded-full usually.

def process_file(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
        
    in_button = False
    new_lines = []
    
    for line in lines:
        if '<button' in line or '<Link' in line or '<a ' in line:
            in_button = True
        
        if in_button:
            line = re.sub(r'rounded-(?:sm|md|lg|xl|2xl|3xl)', 'rounded-full', line)
            line = re.sub(r'\brounded\b(?!-)', 'rounded-full', line)
            
        if '>' in line and in_button:
            # this is a bit flawed if > is on the same line but before the button, or in a string.
            # but it's usually fine for this specific codebase.
            pass
            
        # a safer way: just replace rounded on any line that has button/Link. If a button spans multiple lines, we check if we're "inside" a tag.
        
    # Actually, a better regex for the whole file: 
    # find `className="[^"]*"` or `className=\{[^}]*\}` and if it is within a button tag, replace.
    pass

for d in dirs_to_check:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith(('.jsx', '.tsx', '.js', '.ts')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()

                # Find all <button ... > using a balanced brace approach or just splitting by <button
                parts = content.split('<button')
                for i in range(1, len(parts)):
                    # parts[i] starts right after <button
                    # find the closing > that corresponds to the tag end
                    # We can assume the first > that is NOT inside an arrow function `=>` or JSX expression.
                    # As a heuristic, replace up to the first `>` that is not part of `=>`.
                    # Actually, the easiest is to just replace 'rounded-xl' on lines that are clearly buttons.
                    pass

