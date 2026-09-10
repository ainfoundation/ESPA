import re
with open("src/components/ManagementPortal.jsx", "r") as f:
    content = f.read()

content = content.replace(
    '<p className="text-stone-500 text-sm mb-6 text-center">\n                      Enter the 6-digit code from your authenticator app or email to continue.\n                  </p>',
    '<p className="text-stone-500 text-sm mb-6 text-center">\n                      Enter the 6-digit code from your authenticator app or email to continue.<br/><span className="text-xs font-mono mt-2 inline-block bg-stone-100 px-2 py-1 rounded text-stone-600 border border-stone-200">Test OTP: 123456</span>\n                  </p>'
)

with open("src/components/ManagementPortal.jsx", "w") as f:
    f.write(content)
