import sys
import re

content = open('src/components/UsersView.jsx').read()

content = re.sub(r'<button[^>]*onClick=\{\(\) => setActiveTab\(' + "'batches'" + r'\)\}[^>]*>.*?Batch\s*</button>', '', content, flags=re.DOTALL)
content = re.sub(r'<div className="col-span-1">\s*<label[^>]*>BATCH.*?</select>\s*</div>', '', content, flags=re.DOTALL)
content = content.replace("Manage Participant Profiles, Account Details, and Batch Classifications.", "Manage Participant Profiles and Account Details.")

open('src/components/UsersView.jsx', 'w').write(content)
