import os
import markdown as md


def read_markdown(file_name):
    markdown_directory = os.path.join(os.path.dirname(__file__), "..", "static", "content")

    if not file_name.endswith('.md'):
        file_name += '.md'
    file_path = os.path.join(markdown_directory, file_name)

    with open(file_path, "r") as file:
        return md.markdown(file.read())

