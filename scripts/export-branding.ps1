Add-Type -AssemblyName System.Drawing
$sourceRoot='C:\Users\u6413\.codex\generated_images\01a1b586-a60d-7782-9e6c-244db90cb279'
function Export-Image($name,$output,$width,$height) {
 $source=[System.Drawing.Image]::FromFile((Join-Path $sourceRoot $name))
 $bitmap=[System.Drawing.Bitmap]::new($width,$height)
 $graphics=[System.Drawing.Graphics]::FromImage($bitmap)
 $graphics.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
 $graphics.PixelOffsetMode=[System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
 $ratio=[Math]::Max($width/$source.Width,$height/$source.Height)
 $cropWidth=$width/$ratio; $cropHeight=$height/$ratio
 $rect=[System.Drawing.RectangleF]::new(($source.Width-$cropWidth)/2,($source.Height-$cropHeight)/2,$cropWidth,$cropHeight)
 $graphics.DrawImage($source,[System.Drawing.RectangleF]::new(0,0,$width,$height),$rect,[System.Drawing.GraphicsUnit]::Pixel)
 $bitmap.Save((Join-Path (Get-Location) $output),[System.Drawing.Imaging.ImageFormat]::Png)
 $graphics.Dispose();$bitmap.Dispose();$source.Dispose()
}
Export-Image 'exec-d6389074-6f1c-4df7-ba2d-8d03ee9494e4.png' 'crazygames-assets\cover-landscape-1920x1080.png' 1920 1080
Export-Image 'exec-e417fca1-78b8-4607-9e6a-428f40ba78b5.png' 'crazygames-assets\cover-portrait-800x1200.png' 800 1200
Export-Image 'exec-5e47f95f-6046-48ba-8492-017dd492b019.png' 'crazygames-assets\cover-square-800x800.png' 800 800
Export-Image 'exec-724e0355-7984-4c17-91d8-deeea8f7dac2.png' 'crazygames-assets\game-icon-1024x1024.png' 1024 1024
Export-Image 'exec-724e0355-7984-4c17-91d8-deeea8f7dac2.png' 'public\assets\branding\game-icon-192.png' 192 192
Export-Image 'exec-724e0355-7984-4c17-91d8-deeea8f7dac2.png' 'public\assets\branding\favicon-64.png' 64 64
Get-ChildItem crazygames-assets,public\assets\branding -Filter *.png | ForEach-Object { $im=[System.Drawing.Image]::FromFile($_.FullName); [PSCustomObject]@{File=$_.Name;Width=$im.Width;Height=$im.Height;Bytes=$_.Length};$im.Dispose() }
