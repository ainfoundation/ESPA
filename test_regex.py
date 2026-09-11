import re
with open('src/components/SettingsView.jsx', 'r') as f:
    content = f.read()

print("Found Modals for 2FA?", bool(re.search(r'Modals for 2FA', content)))
print("Found Portal?", bool(re.search(r'<Portal>', content)))
print("Context around Modals for 2FA:")
match = re.search(r'.{0,50}Modals for 2FA.{0,50}', content, flags=re.DOTALL)
if match:
    print(repr(match.group(0)))
