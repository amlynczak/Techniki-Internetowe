#!/usr/bin/env python3
import cgi
from lxml import etree

xmlfile = open("../lab05/task/inventory.xml")
xslfile = open("../lab05/task/inventory.xsl")
xmldom = etree.parse(xmlfile)
xsldom = etree.parse(xslfile)

transform = etree.XSLT(xsldom)
result = transform(xmldom)

print("Content-type: text/html\n")
print(result)
