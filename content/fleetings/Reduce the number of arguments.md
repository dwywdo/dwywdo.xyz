---
title: Reduce the number of arguments
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-23
---
`Reduce the number of arguments` is a third rule to find standard protocols for reusable object-oriented softwares.

This rule points out the issue that occurs when messages (In Java, method) have too many arguments, and suggests the way to enhance readability and maintainability / reusability.

A message (method) with more than 3 ~ 4 arguments is hard to read. Unless it's for creating instances of a specific class, it needs to be re-defined. By re-defining it with fewer arguments, it's more likely that it becomes similar to other messages, providing the opportunity to establish standard protocols (common interface).

How could we reduce the number of arguments?
1. Divide a complicated message to many, but simple ones.
2. Create a new class to hold a group of arguments.

Example
```java
public class UserSettingsManager {
	public void updateSettings(
		int userId,
		String themeColor,
		boolean emailNotifications,
		boolean smsNotifications,
		String languageCode,
		String timezoneId,
	) {
		System.out.println("Start update...: " + userId);
		// Update logic...
		System.out.println("Theme: " + themeColor + ", Notification(Email): " + emailNotifications);
	}
}
```
- Method signature is TOO long, and it's hard to remember the order of arguments.
- If a new configuration is added, method signature itself needs to be changed.

1. Let's create a new class `UserSettings`) to reduce the number of argument to 1.
```java
public class UserSettings {
    private String themeColor;
    private boolean emailNotifications;
    private boolean smsNotifications;
    private String languageCode;
    private String timezoneId;

	// Omitted Constructor and Setter/Getter 
    public UserSettings(String themeColor, boolean emailNotifications, boolean smsNotifications, String languageCode, String timezoneId) {
        this.themeColor = themeColor;
        this.emailNotifications = emailNotifications;
        this.smsNotifications = smsNotifications;
        this.languageCode = languageCode;
        this.timezoneId = timezoneId;
    }
}
````
2. Re-define `updateSettings`
```java
public class UserSettingsManager {
	public void updateSettings(
		int userId,
		UserSettings settings
	) {
		System.out.println("Start update...: " + userId);
		// Update logic...
		System.out.println("Theme: " + settings.getThemeColor() + ", Notification(Email): " + settings.isEmailNotifications());
	}
}
```

Now method call itself is very simple.
- Even if a new config is added in `UserSettings`, `updateSettings` method's signature doesn't need to be changed.
	- We only need to modify `UserSettings` class's internal logic.
- Reusability is enhanced, because we can use `UserSettings` for other messages (methods). (e.g. `logSettingChange(UserSettings old, UserSettings new)`)

---
> [!QUOTE] Note
> 

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
