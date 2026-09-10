import re

content = open('src/pages/LibraryLogin.tsx').read()

import_recaptcha = "import ReCAPTCHA from 'react-google-recaptcha';\nimport { useRef } from 'react';\n"
if "react-google-recaptcha" not in content:
    content = content.replace("import toast from 'react-hot-toast';", "import toast from 'react-hot-toast';\n" + import_recaptcha)

ref_hook = "const recaptchaRef = useRef<ReCAPTCHA>(null);"
if "recaptchaRef" not in content:
    content = content.replace("const navigate = useNavigate();", "const navigate = useNavigate();\n  " + ref_hook)

recaptcha_check = """
      const recaptchaToken = recaptchaRef.current?.getValue();
      if (!recaptchaToken) {
        setError('Please complete the reCAPTCHA');
        return;
      }
"""
content = re.sub(r'if \(!recaptchaVerified\) \{\s*setError\(\'Please complete the reCAPTCHA\'\);\s*return;\s*\}', recaptcha_check.strip(), content)

recaptcha_ui = """
                {isSignUp && (
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    />
                  </div>
                )}
"""
content = re.sub(r'\{isSignUp && \(\s*<div className="border border-stone-200 bg-stone-50 p-4 rounded-xl flex items-center justify-between">.*?<span className="text-\[10px\] text-stone-500 mt-1">reCAPTCHA</span>\s*</div>\s*</div>\s*\)\}', recaptcha_ui.strip(), content, flags=re.DOTALL)

open('src/pages/LibraryLogin.tsx', 'w').write(content)
