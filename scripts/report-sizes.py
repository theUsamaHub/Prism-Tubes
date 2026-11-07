import csv,gzip,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
out=root/'reports';out.mkdir(exist_ok=True)
rows=[]
for p in root.rglob('*'):
 if not p.is_file():continue
 rel=p.relative_to(root)
 if '.git' in rel.parts or rel.parts[0]=='reports':continue
 group='Dependencies' if rel.parts[0]=='node_modules' else 'Production' if rel.parts[0]=='dist' else 'Artwork' if rel.parts[0]=='crazygames-assets' else 'ZIP' if p.suffix=='.zip' else 'Project'
 rows.append({'file':rel.as_posix(),'group':group,'bytes':p.stat().st_size,'KiB':round(p.stat().st_size/1024,2)})
rows.sort(key=lambda r:r['file'])
with (out/'all-file-sizes.csv').open('w',newline='',encoding='utf-8') as f:
 w=csv.DictWriter(f,fieldnames=['file','group','bytes','KiB']);w.writeheader();w.writerows(rows)
lines=['# File sizes','', 'Measured from this workspace. KiB = 1,024 bytes; MiB = 1,048,576 bytes. Git history and this report directory are excluded. The CSV lists every other file, including dependencies. Sizes are a snapshot, not network transfer measurements.','', '| Group | Files | Bytes | MiB |','| --- | ---: | ---: | ---: |']
summary={}
for group in ['Production','Project','Artwork','ZIP','Dependencies']:
 r=[x for x in rows if x['group']==group];total=sum(x['bytes'] for x in r);summary[group]={'files':len(r),'bytes':total,'MiB':round(total/1048576,3)};lines.append(f"| {group} | {len(r)} | {total:,} | {total/1048576:.3f} |")
lines+=['','## Every production file','','| File | Bytes | KiB | Gzip bytes (estimate) |','| --- | ---: | ---: | ---: |']
for r in rows:
 if r['group']=='Production':
  gz=len(gzip.compress((root/r['file']).read_bytes(),mtime=0))
  lines.append(f"| {r['file']} | {r['bytes']:,} | {r['KiB']} | {gz:,} |")
lines+=['','Gzip estimates require server compression. PNG images are already compressed. The production folder includes all playable assets; development dependencies and promotional covers are not shipped.','', '## Project and artwork files','','| File | Bytes | KiB |','| --- | ---: | ---: | ---: |']
for r in rows:
 if r['group'] not in ['Dependencies','Production']:lines.append(f"| {r['file']} | {r['bytes']:,} | {r['KiB']} |")
(out/'file-sizes.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2))
for r in rows:
 if r['group']=='Production':print(r['file'],r['bytes'])
