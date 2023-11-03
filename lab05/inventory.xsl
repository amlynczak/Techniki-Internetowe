<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/~1mlynczak/lab05/task/styles.css" />
      </head>
      <body>
        <h1>Stan Magazynu</h1>
        <xsl:apply-templates select="inventory/productGroup">
          <xsl:sort select="groupName" data-type="text" />
        </xsl:apply-templates>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="productGroup">
    <div class="group">
      <table>
        <tr><td colspan="3" class="group-name"><xsl:value-of select="groupName"/></td></tr>
        <tr>
          <th>Produkt</th>
          <th>Ilość</th>
          <th>Cena</th>
        </tr>
        <xsl:apply-templates select="products/product">
          <xsl:sort select="productName" data-type="text" />
        </xsl:apply-templates>
      </table>
    </div>
  </xsl:template>

  <xsl:template match="product">
    <tr>
      <td><xsl:value-of select="productName" /></td>
      <td><xsl:value-of select="quantity" /></td>
      <td><xsl:value-of select="price" /></td>
    </tr>
  </xsl:template>
</xsl:stylesheet>
