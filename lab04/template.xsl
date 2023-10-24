<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact" />

    <xsl:template match="/">
        <html>
            <head>
                <title>Laboratorium 4 - ćwiczenia</title>
                <link rel="stylesheet" type="text/css" href="style.css" />
            </head>
            <body>
                <h1>Laboratorium 4 - ćwiczenia</h1>
                <ul>
                    <li>Ćwiczenie 1 - lista wszystkich studentów</li>
                    <li>Ćwiczenie 2 - posortowana lista studentów</li>
                    <li>Ćwiczenie 3 - posortowana lista studentów po roku studiów, nazwisku i imieniu</li>
                    <li>Ćwiczenie 4 - lista studentów na poszczególnych kierunkach</li>
                </ul>
                <xsl:apply-templates select="labs/lab" />
            </body>
        </html>
    </xsl:template>

    <xsl:template match="lab">
        <h2><xsl:value-of select="title" /></h2>
        <p><xsl:value-of select="description" /></p>
        <pre><xsl:value-of select="code" /></pre>
    </xsl:template>
</xsl:stylesheet>