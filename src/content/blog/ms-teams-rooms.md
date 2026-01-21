---
title: 'Teams Rooms Setup in Microsoft 365'
description: 'Got collab?'
pubDate: 'August 19 2025'
heroImage: '../../assets/ms-teams.png'
tags: ['microsoft', 'teams', 'rooms']
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

Next, setup calendar processing to act as a teams room.

```powershell
Set-CalendarProcessing -Identity "<RoomName>" -AutomateProcessing AutoAccept -AddOrganizerToSubject $false -AllowRecurringMeetings $true -DeleteAttachments $true -DeleteComments $false -DeleteSubject $false -ProcessExternalMeetingMessages $true -RemovePrivateProperty $false -AddAdditionalResponse $true -AdditionalResponse "This is a Microsoft Teams Meeting room!"
```

> [!TIP]
> If you currently have passwords that expire for your accounts by default, you'll want to disable password expiration as it's required for Teams Devices.

Now, lets add the room info so it can be used by the room finder.

```powershell
Set-Place ConferenceRoom@contoso.onmicrosoft.com -CountryOrRegion "<country>" -State "<state>" -City "<city>" -Floor 5 -FloorLabel “Fifth” -Capacity 8 -IsWheelChairAccessible $false
```

#### Configure Room list in Exchange
Room lists are distribution lists under the hood, but specifically used to manage rooms in a physical building. These cannot be created from the web, you need to use Powershell to do so. 

Lets create a room list to associate our rooms to.

```powershell
New-DistributionGroup -RoomList -Name <Name> [-Alias <Alias>] [-DisplayName "<DisplayName>"] [-PrimarySmtpAddress <EmailAddress>]
```

Now we need to add our rooms to that list.

```powershell
Add-DistributionGroupMember -Identity <RoomListIdentity> -Member <RoomMailboxIdentity>
```
This adds our room to our list, and enables us to find it in the room finder.

> [!NOTE]
> It does take 24ish hours for the changes to be shown in exchange, so you'll need to be patient to confirm that this worked :)