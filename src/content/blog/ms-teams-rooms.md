---
title: 'Teams Rooms Setup in Microsoft 365'
description: 'Got collab?'
pubDate: 'August 19 2025'
heroImage: '../../assets/ms-teams.png'
---


Microsoft Teams rooms are similar to Zoom rooms, with the exception being that they are less intuitive to get setup. This is what I use to setup my rooms.

### Overview

1. Setup Teams Rooms accounts in Office365
2. Configure Teams rooms accounts in Office365 to be a room resource
3. Configure Rooms into buildings in Exchange to show up properly in the room finder
4. Rollout to Meeting room hardware

#### Setup Teams Rooms accounts in Office365
##### Powershell
Connect to Exchange online
```powershell
Connect-ExchangeOnline
```

Next, create your mailbox resource. 
```powershell
New-Mailbox -MicrosoftOnlineServicesID <Office365 ID> -Name <String> -Alias <string> -Room -EnableRoomMailboxAccount $true  -RoomMailboxPassword (ConvertTo-SecureString -String '<Password>' -AsPlainText -Force)
```
> 📘 Tip
> You may wish to setup this as a loop rather than one liner, depending on how many rooms. 