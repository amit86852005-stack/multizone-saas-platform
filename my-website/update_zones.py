import os
import re

base_dir = r"c:\Users\amit8\OneDrive\Desktop\website\my-website"

zone_mapping = {
    r"admin.*": "admin-zone",
    r"sections/hospital-zone.*": "hospital-zone",
    r"sections/women-zone.*": "women-zone",
    r"sections/career-zone.*": "career-zone",
    r"sections/student-zone.*": "student-zone",
    r"jobs\.html": "career-zone",
    r"resume\.html": "career-zone",
    r"skill-prep\.html": "career-zone",
    r"mentorship\.html": "career-zone",
    r"ai-coach\.html": "career-zone",
}

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(".html"):
            path = os.path.join(root, f)
            rel_path = os.path.relpath(path, base_dir).replace('\\', '/')
            
            zone_class = None
            for pattern, c in zone_mapping.items():
                if re.match(pattern, rel_path):
                    zone_class = c
                    break
            
            if zone_class:
                with open(path, "r", encoding="utf-8") as file:
                    content = file.read()
                
                # Check for body tag
                if '<body' in content:
                    # check if already has the class
                    if zone_class in content:
                        print(f"Already has class: {rel_path} with {zone_class}")
                        continue
                    
                    # replace <body ...>
                    def replacer(match):
                        body_tag = match.group(0)
                        if 'class="' in body_tag:
                            return body_tag.replace('class="', f'class="{zone_class} ')
                        elif "class='" in body_tag:
                            return body_tag.replace("class='", f"class='{zone_class} ")
                        else:
                            return body_tag.replace('<body', f'<body class="{zone_class}"')
                    
                    new_content = re.sub(r'<body[^>]*>', replacer, content)
                    with open(path, "w", encoding="utf-8") as file:
                        file.write(new_content)
                    print(f"Updated {rel_path} with {zone_class}")
